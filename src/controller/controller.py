import json
import os
import requests
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException, Depends, Body, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import time
from firebase_admin import auth
from firebase_admin import firestore
from model.model import Model
from model.dao.firebase.firebaseDAOFactory import FirebaseDAOFactory
from fastapi import UploadFile, File, Form, HTTPException
from datetime import datetime, timezone
from google.cloud.firestore_v1 import FieldFilter


# Inicializamos la app

app = FastAPI()

#Almacena las conexiones WebSockets activadas
activate_connection = []

# Configurar CORS para poder enviar y recibir peticiones entre el frontend y el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000","http://localhost:3000"],  # Permitir solo tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

firebase = FirebaseDAOFactory()

db = firebase.get_db()

model = Model()

# @app.get("/get-image/{filename}")
# async def get_image(filename: str):
#       image_path = os.path.join("localDB","albums", filename)
#       print(image_path)

#       if not os.path.exists(image_path):
#             return {"error": "Imagen no encontrada"}

#       return FileResponse(image_path, media_type="image/jpg")

@app.get("/")
def index(request: Request): 
      print("Index")
   # return request
   # return view.get_index_view(request)

@app.get("/ultimaActu")
def ultimaActu(request: Request):
      try:
            # Obtenemos el último álbum reciente
            last_album = model.get_albums()\
                  .order_by("uploadDate", direction=firestore.Query.DESCENDING)\
                  .limit(1)\
                  .get()
            if not last_album:
                  return {"uploadDate": 0}
            
            return {"uploadDate": last_album[0].to_dict().get("uploadDate")}
      
      except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/getalbums")
async def getalbums(request: Request):
      albums = await model.get_albums()
      return albums

@app.get("/album/{album_name}")
def get_album_by_name(request: Request, album_name: str):
      album = model.get_album_by_name(album_name)
      return album

@app.get("/getartistalbums/{artist_name}")
async def get_artist_albums(request: Request, artist_name: str):
      artist = model.get_artist_by_name(artist_name)
      albums_str = await model.get_albums()
      try:
            albums = json.loads(albums_str)
      except json.JSONDecodeError as e:
            print("Error decoding JSON", e)
            return []
      artist_albums = [album for album in albums if album["artist"] == artist["id"]]
      return artist_albums

@app.get("/getartists")
def getartists(request: Request):
      artists = model.get_artists()
      return artists

@app.get('/artist/{artist_name}')
def get_artist_by_name(request: Request, artist_name: str):
      artist = model.get_artist_by_name(artist_name)
      return artist

@app.patch("/updateartist/{artist_id}")
async def update_artist(request: Request, artist_id: str):
      data = await request.json()
      success = model.update_artist(artist_id, data)
      if success:
            return {"message": "Artist updated successfully"}
      else:
            return {"message": "Failed to update artist"}

@app.get("/getsongs")
async def getsongs(request: Request):
      songs = await model.get_songs()
      return songs

@app.get("/get_album_songs/{album_id}")
async def get_album_songs(request: Request, album_id: str):
      songs_str = await model.get_songs()
      try:
            songs = json.loads(songs_str)
      except json.JSONDecodeError as e:
            print("Error decoding JSON", e)
            return []
      album_songs = [song for song in songs if song["album"] == album_id]
      return album_songs

@app.get("/getmerch")
async def getmerch(request: Request):
      merchs = await model.get_merch()
      return merchs

@app.get("/getartistmerch/{artist_name}")
async def get_artist_merch(request: Request, artist_name: str):
      merch_str = await model.get_merch()
      try:
            merchs = json.loads(merch_str)
      except json.JSONDecodeError as e:
            print("Error decoding JSON", e)
            return []
      artist_merch = [merch for merch in merchs if merch["artist"] == artist_name]
      return artist_merch

@app.get("/getusers")
def getusers(request: Request):
      users = model.get_users()
      return users

@app.get("/getuser/{user_id}")
def getuser(request: Request, user_id: str):
      user = model.get_user_by_id(user_id)
      return user

@app.patch("/updateuser/{user_id}")
async def updateuser(request: Request, user_id: str):
      data = await request.json()
      success = model.update_user(user_id, data)
      if success:
            return {"message": "User updated successfully"}
      else:
            return {"message": "Failed to update user"}

@app.get("/gettypes")
def gettypes(request: Request):
      genres = model.get_genreType()
      media = model.get_mediaType()
      merch = model.get_merchType()
      return genres, media, merch

@app.get("/getgenres")
def getgenres(request: Request):
      genres = model.get_genreType()
      return json.loads(genres)

@app.get("/media/{media_id}")
def get_media_by_id(request: Request, media_id: str):
      media = model.get_mediaType_by_id()
      return media

@app.get("/merch_type/{merch_id}")
def get_merch_type_by_id(request: Request, merch_id: str):
      merchType = model.get_merchType_by_id()
      return merchType


@app.get("/media/{media_id}")
def get_media_by_id(request: Request, media_id: str):
      media = model.get_mediaType()
      for m in media:
            if m["id"] == media_id:
                  return m
      return None

@app.post("/upload/albumData")
async def upload_album(album_data: dict = Body(...)):
      try:
            result = model.upload_album(album_data)
            return {"message": "Álbum subido correctamente", "id": result}
      except Exception as e:
            raise HTTPException(500, "Error al subir el álbum")

@app.post("/upload/songData")
async def upload_song(song_data: dict = Body(...)):
      try:
            result = model.upload_song(song_data)
            return {"message": "Canción subida correctamente", "id": result}
      except Exception as e:
            raise HTTPException(500, "Error al subir la canción")

@app.post("/upload/songFile")
async def upload_song_file(file: UploadFile = File(...)):
      try:
            if not file.filename.lower().endswith('.mp3'):
                  raise HTTPException(400, "Sólo se aceptan archivos MP3")
            
            songs_dir = Path(__file__).parent.parent.parent / 'public' / 'localDB' / 'audios'
            songs_dir.mkdir(exist_ok=True)

            file_name = f"song_{datetime.now().timestamp()}.mp3"
            file_path = songs_dir / file_name

            with open(file_path, "wb") as f:
                  f.write(await file.read())

            return {"url": str(Path('/audios') / file_name)}

      except Exception as e:
            raise HTTPException(500, f"Error al subir el archivo: {str(e)}")

@app.post("/upload/albumImage")
async def upload_album_image(file: UploadFile = File(...)):
      try:
            albums_dir = Path(__file__).parent.parent.parent / 'public' / 'localDB' / 'albums'

            albums_dir.mkdir(exist_ok=True)

            file_name = f"album_{datetime.now().timestamp()}{Path(file.filename).suffix}"
            file_path = albums_dir / file_name

            with open(file_path, "wb") as f:
                  f.write(await file.read())

            return {"image": str(Path('/albums') / file_name)}
            
      except Exception as e:
            raise HTTPException(500, f"Error al subir el archivo: {str(e)}")

@app.route("/user", methods=["GET", "POST"])
async def get_user(request: Request):
    # Extraemos el token de la cabecera de la petición
    authorization_header = request.headers.get("Authorization")
    print("Header recibido: ", authorization_header)

    if not authorization_header:
        raise HTTPException(status_code=400, 
                            detail="Token no proporcionado",
                            headers={"WWW-Authenticate": "Bearer"})
    
    #El token tiene el formato "Bearer <token>" asi que lo dividimos
    token = authorization_header.split(" ")[1] # Extraemos el token
    print("Token extraido: ", token)
    try: 
        # Verificamos el token con Firebase
        user_data = firebase.verify_id_token(token)
        uid = user_data['uid']
        print(user_data)
        # Si el token es válido, se lo pasamos al Frontend
        return {
            "message": "Álbum subido correctamente",
            "id": result
        }
        
    except Exception as e:
        # Eliminar la imagen si hubo error al registrar
        try:
            if os.path.exists(image_path):
                os.remove(image_path)
        except:
            pass
        
        raise HTTPException(
            status_code=500, 
            detail=f"Error al registrar el álbum: {str(e)}"
        )

@app.post("/usersRegistrados")
def users_registrados(data : dict = Body(...)):
      email = data.get("email")
      password = data.get("password")

      if not email or not password:
            raise HTTPException(status_code=400, detail="Email y contraseña requeridos")

      try:
            user_docs = list(db.collection("users").where(
                  filter=FieldFilter("email", "==", email)
            )
            .where(filter=FieldFilter("password", "==", password))
            .stream())

            if user_docs:
                  user_data = user_docs[0].to_dict()
                  user_role = user_data.get("register_role", "registrado")  # valor por defecto si no existe
                  print("User Role:", user_role)


            user_exists = len(user_docs) > 0
            print("¿Usuario existe?", user_exists)

            if user_exists:
                  print("Usuario ya registrado en la base de datos")

                  firebase_api_key = "AIzaSyDzmNsBMGv0qi8UqUuev4FlnaycU5lj-nk"
                  firebase_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={firebase_api_key}"

                  response = requests.post(firebase_url, json={
                        "email": email,
                        "password": password,
                        "returnSecureToken": True
                  })

                  if response.status_code != 200: 
                        print("Error al hacer login en Firebase Auth", response.text)
                        return {"error": "Credenciales incorrectas o usuario no registrado"}
                  
                  user_data = response.json()
                  uid = user_data["localId"]
                  id_token = user_data["idToken"]

                  email_name = email.split('@')[0]
                  if email_name.endswith('gmail.com'):
                        email_name = email_name[:10]

                  return {
                        "token": id_token,
                        "role": "registrado",
                        "username": email_name,
                        "uid": uid,
                        "password": password,
                        "registerRole": user_role
                  }

            else:
                  print("Usuario no encontrado en Firestore")
                  return {"error": "Usuario no registrado en Firestore"}

      except Exception as e:
            print("Error en login/registro:", e)
            raise HTTPException(status_code=500, detail="Error interno en el user")



@app.post("/login")
async def login_user(data : dict = Body(...)):
      email = data.get("email")
      password = data.get("password")
      registerRole = data.get("registerRole")
      print("Email", email)
      print("Password", password)
      print("Register role", registerRole)

      try:
            # Usamos la REST API de Firebase Auth para hacer login

            firebase_api_key = "AIzaSyDzmNsBMGv0qi8UqUuev4FlnaycU5lj-nk"
            firebase_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={firebase_api_key}"
            
            response = requests.post(firebase_url, json={
                  "email": email,
                  "password": password,
                  "returnSecureToken": True
            })

            if response.status_code != 200:
                  # Si el usuario no existe, lo registramos
                  print("Usuario no encontrado, registrando...")
                  signup_url = f"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={firebase_api_key}"
                  signup_response = requests.post(signup_url, json={
                        "email": email,
                        "password": password,
                        "returnSecureToken": True
                  })

                  if signup_response.status_code != 200:
                        print("Error al registrar el usuario", signup_response.text)
                        raise HTTPException(status_code=400, detail="Error al registrar usuario")
                  
                  user_data = signup_response.json()
            else:
                  user_data = response.json()

            uid = user_data["localId"]
            print("uid: ", uid)
            id_token = user_data["idToken"]

            # Guardamos al usuario en Firestore si no lo está
            user_ref = db.collection("users").document(uid)
            # Elaboramos el nombre del usuario para identificarlo mejor
            email_name = email.split('@')[0]
            if ( email_name.endswith('gmail.com') ):
                  email_name = email_name[:10]

            if not user_ref.get().exists:
                  user_ref.set({
                        "email": email,
                        "username": email_name,
                        "created_at": firestore.SERVER_TIMESTAMP,
                        "register_role" : registerRole,
                        "password": password,
                  })

            # Si el que se registra es Artista
            if registerRole == "artista":
                  # Guardamos el artista en la coleccion de artistas
                  user_ref = db.collection("artists").document(uid)

                  if not user_ref.get().exists:
                        user_ref.set({
                              "image": "",
                              "info": "",
                              "name": email_name,
                        })

            
            # Devolvemos token + rol
            user_doc = user_ref.get().to_dict()
            return {
                  "token": id_token,
                  "role": user_doc.get("role", "registrado"),
                  "username": email_name,
                  "uid": uid,
                  "password": password
            }

      except Exception as e:
        print("Error en login/registro:", e)
        raise HTTPException(status_code=500, detail="Error interno en el login")
 

@app.post("/logout")
async def logout_user(data : dict = Body(...)):
      uid = data.get("uid") # Asumo que el usuario me pasa su uid para eliminarlo
      idToken = data.get("token")
      print(idToken)
      if not uid:
            raise HTTPException(status_code=400, detail="UID requerido")
      
      try:

            # Eliminar la cuenta de firebase asociada al usuario
            firebase_api_key = "AIzaSyDzmNsBMGv0qi8UqUuev4FlnaycU5lj-nk"
            firebase_url = f"https://identitytoolkit.googleapis.com/v1/accounts:delete?key={firebase_api_key}"

            
            response = requests.post(firebase_url, json={"idToken": idToken})
            if response.status_code != 200:
                  raise HTTPException(status_code=500, detail=f"Error al eliminar la cuenta de Firebase: {response.text}")

            print(f"Cuenta de Firebase eliminada para el usuario {uid}")
            
            return {"message": "Usuario eliminado correctamente"}

      except Exception as e:
            print("Error al intentar eliminar un usuario: ", e)
            raise HTTPException(status_code=500, detail="Error al eliminar el usuario")
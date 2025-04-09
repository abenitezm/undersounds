import json
from fastapi import FastAPI, Request, HTTPException, Depends, Body, WebSocket, WebSocketDisconnect
from model.model import Model
from firebase_admin import firestore
from firebase_admin import auth
from model.dao.firebase.firebaseDAOFactory import FirebaseDAOFactory
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

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
def getalbums(request: Request):
      albums = model.get_albums()
      return albums

@app.get("/album/{album_name}")
def get_album_by_name(request: Request, album_name: str):
      album = model.get_album_by_name(album_name)
      return album

@app.get("/getartistalbums/{artist_id}")
def get_artist_albums(request: Request, artist_id: str):
      albums_str = model.get_albums()
      try:
            albums = json.loads(albums_str)
      except json.JSONDecodeError as e:
            print("Error decoding JSON", e)
            return []
      artist_albums = [album for album in albums if album["artist"] == artist_id]
      return artist_albums

@app.get("/getartists")
def getartists(request: Request):
      artists = model.get_artists()
      return artists

@app.get('/artist/{artist_name}')
def get_artist_by_name(request: Request, artist_name: str):
      artist = model.get_artist_by_name(artist_name)
      return artist

@app.get("/getsongs")
def getsongs(request: Request):
      songs = model.get_songs()
      return songs

@app.get("/getmerch")
def getmerch(request: Request):
      merchs = model.get_merch()
      return merchs

@app.get("/getartistmerch/{artist_name}")
def get_artist_merch(request: Request, artist_name: str):
      print("Artist name: ", artist_name)

@app.get("/getusers")
def getusers(request: Request):
      users = model.get_users()
      return users

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

@app.post("/uploadalbum")
async def upload_album(album_data: dict = Body(...)):
      try:
            result = model.upload_album(album_data)
            return {"message": "Álbum subido corrrectamente", "id": result}
      except Exception as e:
            raise HTTPException(status_code=500, detail="Error al subir el álbum")


@app.post("/login")
async def login_user(data : dict = Body(...)):
      email = data.get("email")
      password = data.get("password")
      print("Email", email)
      print("Password", password)

      try:
            # Usamos la REST API de Firebase Auth para hacer login
            import requests

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
                  print(signup_url)
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
            print("Hola")
            uid = user_data["localId"]
            print("uid: ", uid)
            id_token = user_data["idToken"]

            # Guardamos al usuario en Firestore si no lo está
            user_ref = db.collection("users").document(uid)
            if not user_ref.get().exists:
                  user_ref.set({
                        "email": email,
                        "role":  "registrado",
                        "created_at": firestore.SERVER_TIMESTAMP,
                  })
            
            # Devolvemos token + rol
            user_doc = user_ref.get().to_dict()
            return {
                  "token": id_token,
                  "role": user_doc.get("role", "registrado")
            }

      except Exception as e:
        print("Error en login/registro:", e)
        raise HTTPException(status_code=500, detail="Error interno en el login")

@app.post("/logout")
async def logout_user(data : dict = Body(...)):
      uid = data.get("uid") # Asumo que el usuario me pasa su uid para eliminarlo

      if not uid:
            raise HTTPException(status_code=400, detail="UID requerido")
      
      try:
            # Eliminar al usuario de Firestore
            user_ref = db.collection("users").document(uid)
            if user_ref.get().exists:
                  user_ref.delete()
            
            return {"message": "Usuario eliminado correctamente"}

      except Exception as e:
            print("Error al intentar eliminar un usuario: ", e)
            raise HTTPException(status_code=500, detail="Error al eliminar el usuario")
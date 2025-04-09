import json
import os
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException, Depends, Body, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

from firebase_admin import auth

from model.model import Model
from model.dao.firebase.firebaseDAOFactory import FirebaseDAOFactory


# Inicializamos la app

app = FastAPI()

# Configurar CORS para poder enviar y recibir peticiones entre el frontend y el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000","http://localhost:3000"],  # Permitir solo tu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los headers
)

firebase = FirebaseDAOFactory()

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

from fastapi import UploadFile, File, Form, HTTPException
from pathlib import Path
import os
from datetime import datetime, timezone

@app.post("/uploadalbum")
async def upload_album(
    name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    artist: str = Form(...),
    genre: str = Form(...),
    image: UploadFile = File(...)
):
    # Validar que la imagen sea un formato aceptado (jpg, jpeg, png)
    valid_image_extensions = ['.jpg', '.jpeg', '.png']
    if not any(image.filename.lower().endswith(ext) for ext in valid_image_extensions):
        raise HTTPException(
            status_code=400, 
            detail="Formato de imagen inválido. Use JPG, JPEG o PNG"
        )
    
    # Crear directorio para álbumes si no existe
    albums_dir = Path(__file__).parent.parent / 'public' / 'localDB' / 'albums'
    os.makedirs(albums_dir, exist_ok=True)
    
    # Generar nombre seguro para el archivo
    safe_name = name.strip().lower().replace(" ", "_")
    image_extension = Path(image.filename).suffix.lower()
    image_filename = f"{safe_name}_cover{image_extension}"
    image_path = albums_dir / image_filename
    
    try:
        # Guardar la imagen del álbum
        with open(image_path, "wb") as f:
            content = await image.read()
            f.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"No se pudo guardar la imagen: {str(e)}"
        )
    
    try:
        # Preparar datos del álbum según el formato requerido
        album_data = {
            "artist": artist,
            "description": description,
            "image": f"/albums/{image_filename}",
            "media": [],
            "name": name,
            "price": price,
            "uploadDate": datetime.now(timezone.utc).isoformat()
        }
        
        # Llamar al modelo para registrar el álbum
        result = model.upload_album(album_data)
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

@app.post("/uploadsong")
async def upload_song(
      album: str = Form(...),
      commentator: str = Form(...),
      comments: str = Form(...),
      genre: str = Form(...),
      name: str = Form(...),
      trackLength = Form(...),
      file: UploadFile = File(...)
):
      if not file.filename.endswith('.mp3'):
            raise HTTPException(status_code=400, detail="Archivo de audio inválido")
      
      songs_dir = Path(__file__).parent.parent / 'public' / 'localDB' / 'songs'
      safe_name = name.strip().lower().replace(" ", "_") + ".mp3"
      save_path = songs_dir / safe_name
      
      os.makedirs(save_path.parent, exist_ok=True)

      try:
            with open(save_path, "wb") as f:
                  content = await file.read()
                  f.write(content)
      except Exception as e:
            raise HTTPException(status_code=500, detail=f"No se pudo guardar el archivo: {str(e)}")

      try:
            song_data = {
                  "album": album,
                  "commentator": commentator,
                  "comments": comments,
                  "genre": genre,
                  "name": name,
                  "trackLength": trackLength,
                  "url": str(save_path)
            }

            result = model.upload_song(song_data)
            return {"message": "Canción subida correctamente", "id": result}

      except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al registrar la canción: {str(e)}")


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
            "message": "Token válido",
            "user": {
                "uid": user_data["uid"],
                "email": user_data.get("email"),
            }
        }

    except Exception as e:
        # Si el token es inválido o ha expirado, se lanzan un error
        raise HTTPException(status_code=401, detail="Token inválido o expirado")

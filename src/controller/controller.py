import json
from fastapi import FastAPI, Request, HTTPException, Depends
from model.model import Model
from firebase_admin import auth
from model.dao.firebase.firebaseDAOFactory import FirebaseDAOFactory
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/media/{media_id}")
def get_media_by_id(request: Request, media_id: str):
      media = model.get_mediaType_by_id()
      return media

@app.get("/merch_type/{merch_id}")
def get_merch_type_by_id(request: Request, merch_id: str):
      merchType = model.get_merchType_by_id()
      return merchType



def get_media_by_id(request: Request, media_id: str):
      media = model.get_mediaType()
      for m in media:
            if m["id"] == media_id:
                  return m
      return None



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

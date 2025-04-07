from ...factory.daoFactoryInterface import InterfaceDAOFactory
from .collection.firebaseDAOSong import FirebaseSongDAO
from .collection.firebaseDAOGenreType import FirebaseGenreTypeDAO
from .collection.firebaseDAOMediaType import FirebaseMediaTypeDAO
from .collection.firebaseDAOMerchType import FirebaseMerchTypeDAO
from .collection.firebaseDAOAlbum import FirebaseAlbumDAO
from .collection.firebaseDAOArtist import FirebaseArtistDAO
from .collection.firebaseDAOMerch import FirebaseMerchDAO
from .collection.firebaseDAOUser import FirebaseUserDAO
import firebase_admin
from firebase_admin import credentials, firestore, auth
import os

class FirebaseDAOFactory(InterfaceDAOFactory):

    def __init__(self):
        try:
            if not firebase_admin._apps:
                dir_path = os.path.dirname(os.path.realpath(__file__))
                cred_path = os.path.join(dir_path, 'credentials.json') # Busca la ruta donde tienes el credentials.json
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                print("Firebase authentificator inicializado correctamente.")
            else:
                print("Firebase ya estaba inicializado.")
                
            self.db = firestore.client()

        except Exception as e:
            print("Error al conectarse con Firebase: ", e)
            self.db = None

    def verify_token(self, token):
        #Verificamos si un token de usuario es válido.
        try:
            decoded_token = auth.verify_id_token(token)
            uid = decoded_token['uid']
            return decoded_token
        
        except Exception as e:
            print("Error al verificar el token: ", e)
            return None

    def getAlbumDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("albums")
        return FirebaseAlbumDAO(collection)

    def getArtistDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("artists")
        return FirebaseArtistDAO(collection)

    def getSongDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("songs")
        return FirebaseSongDAO(collection)

    def getGenreTypeDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("genreType")
        return FirebaseGenreTypeDAO(collection)

    def getMediaTypeDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("mediaType")
        return FirebaseMediaTypeDAO(collection)

    def getMerchDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("merch")
        return FirebaseMerchDAO(collection)

    def getMerchTypeDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("merchType")
        return FirebaseMerchTypeDAO(collection)

    def getUserDao(self):
        if not self.db:
            raise Exception("No se pudo inicializar Firebase Firestore.")
        collection = self.db.collection("users")
        return FirebaseUserDAO(collection)
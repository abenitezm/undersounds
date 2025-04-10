from ...interfaceDAOArtist import InterfaceArtistDAO
from ....dto.artistDTO import ArtistDTO, ArtistsDTO

class FirebaseArtistDAO(InterfaceArtistDAO):

    def __init__(self, collection):
        self.collection = collection
    
    def get_artists(self):
        artists = ArtistsDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                artist_data = doc.to_dict()
                artist_dto = ArtistDTO()

                artist_dto.id = doc.id
                artist_dto.image = artist_data.get("image", "")
                artist_dto.name = artist_data.get("name", "")
                artists.insertArtist(artist_dto.artistdto_to_dict())

        except Exception as e:
            print(e)

        return artists.artistlist_to_json()
    
    def get_artist_by_name(self, artist_name):
        artist = ArtistDTO()
        try:
            query = self.collection.where("name", "==", artist_name).get()
            if(query):
                for doc in query:
                    artist_data = doc.to_dict()
                    artist.id = doc.id
                    artist.image = artist_data.get("image", "")
                    artist.name = artist_data.get("name", "")
                    artist.info = artist_data.get("info", "")
        except Exception as e:
            print(e)
        return artist.artistdto_to_dict()


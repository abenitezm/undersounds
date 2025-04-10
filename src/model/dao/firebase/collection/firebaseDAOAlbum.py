from ...interfaceDAOAlbum import InterfaceAlbumDAO
from ....dto.albumDTO import AlbumDTO, AlbumsDTO

class FirebaseAlbumDAO(InterfaceAlbumDAO):

    def __init__(self, collection):
        self.collection = collection
    
    def get_albums(self):
        albums = AlbumsDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                album_data = doc.to_dict()
                album_dto = AlbumDTO()

                artist_ref = album_data.get("artist")
                media_refs = album_data.get("media", [])

                album_dto.id = doc.id
                album_dto.artist = artist_ref.id if artist_ref else ""
                album_dto.description = album_data.get("description", "")
                album_dto.image = album_data.get("image", "")

                album_dto.media = []
                for ref in media_refs:
                    media_ref = ref.get()
                    media_data = media_ref.to_dict()
                    album_dto.media.append(media_data.get("type", ""))

                genre_ref = album_data.get("genre")
                genre_data = genre_ref.get().to_dict() if genre_ref else {}

                album_dto.genre = genre_data.get("type", "")
                album_dto.name = album_data.get("name", "")
                album_dto.price = album_data.get("price", 0.0)
                album_dto.uploadDate = album_data.get("uploadDate", "")
                albums.insertAlbum(album_dto.albumdto_to_dict())

        except Exception as e:
            print(e)

        return albums.albumlist_to_json()
    
    def get_album_by_name(self, album_name):
        album = AlbumDTO()
        try:
            query = self.collection.where("name", "==", album_name).get()
            if(query):
                for doc in query:
                    album_data = doc.to_dict()
                    artist_ref = album_data.get("artist")
                    media_refs = album_data.get("media", [])
                    album.id = doc.id
                    album.artist = artist_ref.get().to_dict().get("name", "") if artist_ref else ""
                    album.description = album_data.get("description", "")
                    album.image = album_data.get("image", "")
                    album.media = []
                    for ref in media_refs:
                        media_ref = ref.get()
                        media_data = media_ref.to_dict()
                        album.media.append(media_data.get("type", ""))
                    genre_ref = album_data.get("genre")
                    genre_data = genre_ref.get().to_dict() if genre_ref else {}
                    album.genre = genre_data.get("type", "")
                    album.name = album_data.get("name", "")
                    album.price = album_data.get("price", 0.0)
                    album.uploadDate = album_data.get("uploadDate", "")
        except Exception as e:
            print(e)
        return album.albumdto_to_dict()


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
                album_dto.media = [ref.id for ref in media_refs]
                album_dto.name = album_data.get("name", "")
                album_dto.price = album_data.get("price", 0.0)
                album_dto.uploadDate = album_data.get("uploadDate", "")
                albums.insertAlbum(album_dto.albumdto_to_dict())

        except Exception as e:
            print(e)

        return albums.albumlist_to_json()

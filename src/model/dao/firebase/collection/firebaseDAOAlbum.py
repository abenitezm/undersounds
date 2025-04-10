import time
from ...interfaceDAOAlbum import InterfaceAlbumDAO
from ....dto.albumDTO import AlbumDTO, AlbumsDTO
import asyncio
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

executor = ThreadPoolExecutor(max_workers=20)

class FirebaseAlbumDAO(InterfaceAlbumDAO):

    def __init__(self, collection):
        self.collection = collection
    
    async def async_get_refs(self, ref):
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(executor, ref.get)

    async def get_albums(self):
        albums = AlbumsDTO()
        start_time = time.time()
        try:
            query = list(self.collection.stream())
            task = []


            for doc in query:
                task.append(self.process_album(doc))

            results = await(asyncio.gather(*task))

            for album in results:
                albums.insertAlbum(album)

        except Exception as e:
            print(e)

        print("Got albums in %s seconds" % (time.time() - start_time))

        return albums.albumlist_to_json()
    
    async def process_album(self, doc):
        album_data = doc.to_dict()
        album_dto = AlbumDTO()

        artist_ref = album_data.get("artist")
        media_refs = album_data.get("media", [])
        genre_ref = album_data.get("genre")

        artist_task = self.async_get_refs(artist_ref) if artist_ref else None
        genre_task = self.async_get_refs(genre_ref) if genre_ref else None
        media_tasks = [self.async_get_refs(ref) for ref in media_refs]

        artist_data = await artist_task if artist_task else None
        genre_data = await genre_task if genre_task else {}
        media_data = await asyncio.gather(*media_tasks) if media_tasks else []

        album_dto.id = doc.id
        album_dto.artist = artist_data.id if artist_data else ""
        album_dto.description = album_data.get("description", "")
        album_dto.image = album_data.get("image", "")

        album_dto.media = [media.to_dict().get("type", "") for media in media_data]
        album_dto.genre = genre_data.to_dict().get("type", "") if genre_data else ""  # Collecting media IDs
        album_dto.name = album_data.get("name", "")
        album_dto.price = album_data.get("price", 0.0)
        album_dto.uploadDate = album_data.get("uploadDate", "")

        return album_dto.albumdto_to_dict()


    
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

    def add_album(self, album_data):
        album_data["uploadDate"] = datetime.utcnow().isoformat() + "Z"
        album_data["media"] = []
        album_data["artist"] = ""
        album_data["image"] = ""

        doc_ref = self.collection.document()
        doc_ref.set(album_data)

        return doc_ref.id        

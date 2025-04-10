from ...interfaceDAOSong import InterfaceSongDAO
from ....dto.songDTO import SongDTO, SongsDTO
import asyncio
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=20)

class FirebaseSongDAO(InterfaceSongDAO):

    def __init__(self, collection):
        self.collection = collection

    async def async_get_refs(self, ref):
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(executor, ref.get)
    
    async def get_songs(self):
        songs = SongsDTO()
        try:
            query = self.collection.stream()
            tasks = []

            for doc in query:
                song_data = doc.to_dict()
                song_dto = SongDTO()

                album_ref = song_data.get("album")
                genre_ref = song_data.get("genre")

                album_task = self.async_get_refs(album_ref) if album_ref else None
                genre_task = self.async_get_refs(genre_ref) if genre_ref else None

                tasks.append((doc, song_data, album_task, genre_task))

            results = await asyncio.gather(*[self.process_song(doc, song_data, album_task, genre_task) for doc, song_data, album_task, genre_task in tasks])

            for song in results:
                songs.insertSong(song)

        except Exception as e:
            print(e)

        return songs.songlist_to_json()


    async def process_song(self, doc, song_data, album_task, genre_task):
        song_data = doc.to_dict()
        song_dto = SongDTO()

        album_data = await album_task if album_task else None
        genre_data = await genre_task if genre_task else None

        song_dto.id = doc.id
        song_dto.album = album_data.id if album_data else ""
        song_dto.genre = genre_data.id if genre_data else ""
        song_dto.name = song_data.get("name", "")
        song_dto.trackLength = song_data.get("trackLength", "")
        song_dto.url = song_data.get("url", "")

        return song_dto.songdto_to_dict()
from ...interfaceDAOSong import InterfaceSongDAO
from ....dto.songDTO import SongDTO, SongsDTO

class FirebaseSongDAO(InterfaceSongDAO):

    def __init__(self, collection):
        self.collection = collection
    
    def get_songs(self):
        songs = SongsDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                song_data = doc.to_dict()
                song_dto = SongDTO()

                album_ref = song_data.get("album")
                genre_ref = song_data.get("genre")

                song_dto.id = doc.id
                song_dto.album = album_ref.id if album_ref else ""
                song_dto.genre = genre_ref.id if genre_ref else ""
                song_dto.name = song_data.get("name", "")
                song_dto.trackLength = song_data.get("trackLength", "")
                song_dto.commentator = song_data.get("commentator", "")
                song_dto.comments = song_data.get("comments", [])
                songs.insertSong(song_dto.songdto_to_dict())

        except Exception as e:
            print(e)

        return songs.songlist_to_json()

    def add_song(self, song_data):
        song_data["commentator"] = "@Anonimo"
        song_data["comments"] = []

        doc_ref = self.collection.document()
        doc_ref.set(song_data)

        return doc_ref.id

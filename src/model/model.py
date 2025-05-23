from .dao.firebase.firebaseDAOFactory import FirebaseDAOFactory

class Model ():

    def __init__(self):
        self.factory = FirebaseDAOFactory()

        self.daoAlbum = self.factory.getAlbumDao()
        self.daoArtist = self.factory.getArtistDao()
        self.daoSong = self.factory.getSongDao()
        self.daoGenreType = self.factory.getGenreTypeDao()
        self.daoMediaType = self.factory.getMediaTypeDao()
        self.daoMerch = self.factory.getMerchDao()
        self.daoMerchType = self.factory.getMerchTypeDao()
        self.daoUser = self.factory.getUserDao()

    async def get_albums(self):
        return await self.daoAlbum.get_albums()
    
    def get_album_by_name(self, album_name):
        return self.daoAlbum.get_album_by_name(album_name)

    def get_artists(self):
        return self.daoArtist.get_artists()

    def get_artist_by_name(self, artist_name):
        return self.daoArtist.get_artist_by_name(artist_name)

    def update_artist(self, artist_id, data):
        return self.daoArtist.update_artist(artist_id, data)

    async def get_songs(self):
        return await self.daoSong.get_songs()
    
    def get_genreType(self):
        return self.daoGenreType.get_genreType()

    def get_mediaType(self):
        return self.daoMediaType.get_mediaType()
    
    def get_mediaType_by_id(self, media_id):
        return self.daoMediaType.get_mediaType_by_id(media_id)

    async def get_merch(self):
        return await self.daoMerch.get_merchs()

    def get_merchType(self):
        return self.daoMerchType.get_merchType()

    def get_merchType_by_id(self, merch_id):
        return self.daoMerchType.get_merchType_by_id(merch_id)

    def get_users(self):
        return self.daoUser.get_users()
    
    def get_user_by_id(self, user_id):
        return self.daoUser.get_user_by_id(user_id)

    def update_user(self, user_id, data):
        return self.daoUser.update_user(user_id, data)

    def upload_album(self, album_data):
        return self.daoAlbum.add_album(album_data)

    def upload_song(self, song_data):
        return self.daoSong.add_song(song_data)
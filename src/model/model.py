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

    def get_albums(self):
        return self.daoAlbum.get_albums()

    def get_artists(self):
        return self.daoArtist.get_artists()

    def get_songs(self):
        return self.daoSong.get_songs()
    
    def get_genreType(self):
        return self.daoGenreType.get_genreType()

    def get_mediaType(self):
        return self.daoMediaType.get_mediaType()

    def get_merch(self):
        return self.daoMerch.get_merchs()

    def get_merchType(self):
        return self.daoMerchType.get_merchType()

    def get_users(self):
        return self.daoUser.get_users()
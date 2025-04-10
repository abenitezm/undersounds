import json

class AlbumsDTO():
    def __init__(self):
        self.albumlist = []

    def insertAlbum(self, elem):
        self.albumlist.append(elem)

    def albumlist_to_json(self):
        return json.dumps(self.albumlist)


class AlbumDTO():
    def __init__(self):
        self.id = None
        self.artist = None
        self.description = None
        self.image = None
        self.media = None
        self.name = None
        self.price = None
        self.uploadDate = None
        self.genre = None

    def is_Empty(self):
        return (self.id is None and self.artist is None and self.description 
        is None and self.image is None and self.media is None and self.name 
        is None and self.price is None and self.uploadDate is None and self.genre is None)

    def get_id(self):
        return self.id

    def get_artist(self):
        return self.artist
    
    def get_description(self):
        return self.description

    def get_image(self):
        return self.image

    def get_media(self):
        return self.media

    def get_name(self):
        return self.name

    def get_price(self):
        return self.price

    def get_uploadDate(self):
        return self.uploadDate
    
    def get_genre(self):
        return self.genre

    def set_id(self, id):
        self.id = id
    
    def set_artist(self, artist):
        self.artist = artist

    def set_description(self, description):
        self.description = description

    def set_image(self, image):
        self.image = image

    def set_media(self, media):
        self.media = media

    def set_name(self, name):
        self.name = name

    def set_price(self, price):
        self.price = price

    def set_uploadDate(self, uploadDate):
        self.uploadDate = uploadDate
    
    def set_genre(self, genre):
        self.genre = genre
 
    def albumdto_to_dict(self):
        return {
            "id": self.id,
            "artist": self.artist,
            "description": self.description,
            "image": self.image,
            "media": self.media,
            "name": self.name,
            "price": self.price,
            "uploadDate": self.uploadDate,
            "genre": self.genre,
        }
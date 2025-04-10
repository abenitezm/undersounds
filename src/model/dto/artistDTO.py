import json

class ArtistsDTO():
    def __init__(self):
        self.artistlist = []

    def insertArtist(self, elem):
        self.artistlist.append(elem)

    def artistlist_to_json(self):
        return json.dumps(self.artistlist)



class ArtistDTO():
    def __init__(self):
        self.id = None
        self.image = None
        self.name = None
        self.info = None

    def is_Empty(self):
        return (self.id is None and self.image is None and self.name is None and self.info is None)

    def get_id(self):
        return self.id

    def get_image(self):
        return self.image

    def get_name(self):
        return self.name
    
    def get_info(self):
        return self.info

    def get_info(self):
        return self.info

    def set_id(self, id):
        self.id = id
    
    def set_image(self, image):
        self.image = image

    def set_name(self, name):
        self.name = name

    def set_info(self, info):
        self.info = info

    def artistdto_to_dict(self):
        return {
            "id": self.id,
            "image": self.image,
            "name": self.name,
            "info": self.info
        }
import json

class MerchsDTO():
    def __init__(self):
        self.merchlist = []

    def insertMerch(self, elem):
        self.merchlist.append(elem)

    def merchlist_to_json(self):
        return json.dumps(self.merchlist)


class MerchDTO():
    def __init__(self):
        self.id = None
        self.artist = None
        self.description = None
        self.image = None
        self.name = None
        self.price = None
        self.stock = None
        self.type = None

    def is_Empty(self):
        return (self.id is None and self.artist is None and self.description is 
        None and self.image is None and self.name is None and self.price is None 
        and self.stock is None and self.type is None)

    def get_id(self):
        return self.id

    def get_artist(self):
        return self.artist

    def get_description(self):
        return self.description

    def get_image(self):
        return self.image

    def get_name(self):
        return self.name

    def get_price(self):
        return self.price

    def get_stock(self):
        return self.stock

    def get_typ(self):
        return self.type

    def set_id(self, id):
        self.id = id
    
    def set_artist(self, artist):
        self.artist = artist
    
    def set_description(self, description):
        self.description = description
    
    def set_image(self, image):
        self.image = image

    def set_name(self, name):
        self.name = name

    def set_price(self, price):
        self.price = price
    
    def set_stock(self, stock):
        self.stock = stock
    
    def set_type(self, type):
        self.type = type
    
    def merchdto_to_dict(self):
        return {
            "id": self.id,
            "artist": self.artist,
            "description": self.description,
            "image": self.image,
            "name": self.name,
            "price": self.price,
            "stock": self.stock,
            "type": self.type
        }
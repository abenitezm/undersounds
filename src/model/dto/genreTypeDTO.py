import json

class GenreTypesDTO():
    def __init__(self):
        self.genreTypeList = []

    def insertGenreType(self, elem):
        self.genreTypeList.append(elem)

    def insertGenreType_to_json(self):
        return json.dumps(self.genreTypeList)

class GenreTypeDTO():
    def __init__(self):
        self.id = None
        self.type = None

    def is_Empty(self):
        return (self.id is None and self.type is None)

    def get_id(self):
        return self.id
    
    def get_type(self):
        return self.type
    
    def set_id(self, id):
        self.id = id

    def set_type(self, type):
        self.type = type

    def genreTypedto_to_dict(self):
        return {
            "id": self.id,
            "type": self.type
        }
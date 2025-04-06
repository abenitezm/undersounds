import json

class MediaTypesDTO():
    def __init__(self):
        self.mediaTypeList = []

    def insertMediaType(self, elem):
        self.mediaTypeList.append(elem)

    def insertMediaType_to_json(self):
        return json.dumps(self.mediaTypeList)

class MediaTypeDTO():
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

    def mediaTypedto_to_dict(self):
        return {
            "id": self.id,
            "type": self.type
        }
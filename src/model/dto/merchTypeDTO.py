import json

class MerchTypesDTO():
    def __init__(self):
        self.merchTypeList = []

    def insertMerchType(self, elem):
        self.merchTypeList.append(elem)

    def insertMerchType_to_json(self):
        return json.dumps(self.merchTypeList)

class MerchTypeDTO():
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

    def merchTypedto_to_dict(self):
        return {
            "id": self.id,
            "type": self.type
        }
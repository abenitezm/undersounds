from ...interfaceDAOMerchType import InterfaceMerchTypeDAO
from ....dto.merchTypeDTO import MerchTypeDTO, MerchTypesDTO

class FirebaseMerchTypeDAO(InterfaceMerchTypeDAO):

    def __init__(self, collection):
         self.collection = collection
    
    def get_merchType(self):
        merchType = MerchTypesDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                merchType_data = doc.to_dict()
                merchType_dto = MerchTypeDTO()

                merchType_dto.id = doc.id
                merchType_dto.type = merchType_data.get("type", "")
                merchType.insertMerchType(merchType_dto.merchTypedto_to_dict())
        
        except Exception as e:
            print(e)

        return merchType.insertMerchType_to_json()
    
    def get_merchType_by_id(self, merchType_id):
        merchType = MerchTypeDTO()
        try:
            query = self.collection.where("id", "==", merchType_id).get()
            if(query):
                for doc in query:
                    merchType_data = doc.to_dict()
                    merchType.id = doc.id
                    merchType.type = merchType_data.get("type", "")
        except Exception as e:
            print(e)
        return merchType.merchTypedto_to_dict()

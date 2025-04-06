from ...interfaceDAOMerch import InterfaceMerchDAO
from ....dto.merchDTO import MerchDTO, MerchsDTO

class FirebaseMerchDAO(InterfaceMerchDAO):

    def __init__(self, collection):
        self.collection = collection
    
    def get_merchs(self):
        merchs = MerchsDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                merch_data = doc.to_dict()
                merch_dto = MerchDTO()

                artist_ref = merch_data.get("artist")
                type_ref = merch_data.get("type")

                merch_dto.id = doc.id
                merch_dto.artist = artist_ref.id if artist_ref else ""
                merch_dto.description = merch_data.get("description", "")
                merch_dto.image = merch_data.get("image", "")
                merch_dto.name = merch_data.get("name", "")
                merch_dto.price = merch_data.get("price", 0.0)
                merch_dto.stock = merch_data.get("stock", 0)
                merch_dto.type = type_ref.id if type_ref else ""
                merchs.insertMerch(merch_dto.merchdto_to_dict())

        except Exception as e:
            print(e)

        return merchs.merchlist_to_json()

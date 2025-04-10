from ...interfaceDAOMerch import InterfaceMerchDAO
from ....dto.merchDTO import MerchDTO, MerchsDTO
import asyncio
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=20)

class FirebaseMerchDAO(InterfaceMerchDAO):

    def __init__(self, collection):
        self.collection = collection

    async def async_get_refs(self, ref):
        loop = asyncio.get_running_loop()
        return await loop.run_in_executor(executor, ref.get)
    
    async def get_merchs(self):
        merchs = MerchsDTO()
        try:
            query = list(self.collection.stream())
            tasks = []
            for doc in query:
                # merch_data = doc.to_dict()
                # merch_dto = MerchDTO()

                # artist_ref = merch_data.get("artist")
                # type_ref = merch_data.get("type")

                # merch_dto.id = doc.id
                # merch_dto.artist = artist_ref.get().to_dict().get("name", "") if artist_ref else ""
                # merch_dto.artist = artist_ref.id if artist_ref else ""
                # merch_dto.description = merch_data.get("description", "")
                # merch_dto.image = merch_data.get("image", "")
                # merch_dto.name = merch_data.get("name", "")
                # merch_dto.price = merch_data.get("price", 0.0)
                # merch_dto.stock = merch_data.get("stock", 0)
                # merch_dto.type = type_ref.get().to_dict().get("type", "") if type_ref else ""
                # merchs.insertMerch(merch_dto.merchdto_to_dict())
                tasks.append(self.process_merch(doc))
            
            results = await(asyncio.gather(*tasks))

            for merch in results:
                merchs.insertMerch(merch)


        except Exception as e:
            print(e)

        return merchs.merchlist_to_json()

    async def process_merch(self, doc):
        merch_data = doc.to_dict()
        merch_dto = MerchDTO()

        artist_ref = merch_data.get("artist")
        type_ref = merch_data.get("type")

        artist_task = self.async_get_refs(artist_ref) if artist_ref else None
        type_task = self.async_get_refs(type_ref) if type_ref else None

        artist_data = await artist_task if artist_task else None
        type_data = await type_task if type_task else {}

        merch_dto.id = doc.id
        merch_dto.artist = artist_data.to_dict().get("name", "") if artist_data else ""
        merch_dto.description = merch_data.get("description", "")
        merch_dto.image = merch_data.get("image", "")
        merch_dto.name = merch_data.get("name", "")
        merch_dto.price = merch_data.get("price", 0.0)
        merch_dto.stock = merch_data.get("stock", 0)
        merch_dto.type = type_data.to_dict().get("type", "") if type_data else ""

        return merch_dto.merchdto_to_dict()


        
from ...interfaceDAOMediaType import InterfaceMediaTypeDAO
from ....dto.mediaTypeDTO import MediaTypeDTO, MediaTypesDTO

class FirebaseMediaTypeDAO(InterfaceMediaTypeDAO):

    def __init__(self, collection):
         self.collection = collection
    
    def get_mediaType(self):
        mediaType = MediaTypesDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                mediaType_data = doc.to_dict()
                mediaType_dto = MediaTypeDTO()

                mediaType_dto.id = doc.id
                mediaType_dto.type = mediaType_data.get("type", "")
                mediaType.insertMediaType(mediaType_dto.mediaTypedto_to_dict())
        
        except Exception as e:
            print(e)

        return mediaType.insertMediaType_to_json()

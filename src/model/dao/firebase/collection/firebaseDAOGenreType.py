from ...interfaceDAOGenreType import InterfaceGenreTypeDAO
from ....dto.genreTypeDTO import GenreTypeDTO, GenreTypesDTO

class FirebaseGenreTypeDAO(InterfaceGenreTypeDAO):

    def __init__(self, collection):
         self.collection = collection
    
    def get_genreType(self):
        genreType = GenreTypesDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                genreType_data = doc.to_dict()
                genreType_dto = GenreTypeDTO()

                genreType_dto.id = doc.id
                genreType_dto.type = genreType_data.get("type", "")
                genreType.insertGenreType(genreType_dto.genreTypedto_to_dict())
        
        except Exception as e:
            print(e)

        return genreType.insertGenreType_to_json()
    

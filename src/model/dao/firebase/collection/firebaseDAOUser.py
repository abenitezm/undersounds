from ...interfaceDAOUser import InterfaceUserDAO
from ....dto.userDTO import UserDTO, UsersDTO

class FirebaseUserDAO(InterfaceUserDAO):

    def __init__(self, collection):
        self.collection = collection
    
    def get_users(self):
        users = UsersDTO()
        try:
            query = self.collection.stream()
            print(query)
            for doc in query:
                user_data = doc.to_dict()
                user_dto = UserDTO()

                favourites_refs = user_data.get("favourites", [])
                following_refs = user_data.get("following", [])

                user_dto.id = doc.id
                user_dto.biography = user_data.get("biography", "")
                user_dto.favourites = [ref.id for ref in favourites_refs]
                user_dto.following = [ref.id for ref in following_refs]
                user_dto.image = user_data.get("image", "")
                user_dto.name = user_data.get("name", "")
                users.insertUser(user_dto.userdto_to_dict())

        except Exception as e:
            print(e)

        return users.userlist_to_json()

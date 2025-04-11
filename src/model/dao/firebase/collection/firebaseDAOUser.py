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
                user_dto.email = user_data.get("email", "")
                user_dto.favourites = [ref.id for ref in favourites_refs]
                user_dto.following = [ref.id for ref in following_refs]
                user_dto.image = user_data.get("image", "")
                user_dto.username = user_data.get("username", "")
                user_dto.register_role = user_data.get("register_role", "")
                user_dto.password = user_data.get("password", "")
                user_dto.emailForFans = user_data.get("emailForFans", "")
                user_dto.language = user_data.get("language", "")
                user_dto.location = user_data.get("location", "")
                user_dto.website = user_data.get("website", "")
                user_dto.darkMode = user_data.get("darkMode", False)
                user_dto.sellAlbumEmail = user_data.get("sellAlbumEmail", False)
                user_dto.sellAlbumWeb = user_data.get("sellAlbumWeb", False)
                user_dto.sellMerchEmail = user_data.get("sellMerchEmail", False)
                user_dto.sellMerchWeb = user_data.get("sellMerchWeb", False)
                user_dto.reviewEmail = user_data.get("reviewEmail", False)
                user_dto.reviewWeb = user_data.get("reviewWeb", False)
                user_dto.followEmail = user_data.get("followEmail", False)
                user_dto.followWeb = user_data.get("followWeb", False)
                user_dto.artistMusicEmail = user_data.get("artistMusicEmail", False)
                user_dto.artistMusicWeb = user_data.get("artistMusicWeb", False)
                user_dto.artistDiscountEmail = user_data.get("artistDiscountEmail", False)
                user_dto.artistDiscountWeb = user_data.get("artistDiscountWeb", False)
                user_dto.preferredPayment = user_data.get("preferredPayment", "")
                user_dto.cardNumber = user_data.get("cardNumber", "")
                user_dto.expirationDate = user_data.get("expirationDate", "")
                user_dto.cvc = user_data.get("cvc", "")
                user_dto.senderName = user_data.get("senderName", "")
                user_dto.senderAddress = user_data.get("senderAddress", "")
                user_dto.shippingDays = user_data.get("shippingDays", 0)
                user_dto.shippingMethod = user_data.get("shippingMethod", "")
                users.insertUser(user_dto.userdto_to_dict())

        except Exception as e:
            print(e)

        return users.userlist_to_json()
    
    def get_user_by_id(self, user_id):
        user_dto = UserDTO()
        try:
            doc = self.collection.document(user_id).get()
            if doc.exists:
                user_data = doc.to_dict()
                user_dto.id = doc.id
                user_dto.biography = user_data.get("biography", "")
                user_dto.email = user_data.get("email", "")
                user_dto.favourites = [ref.id for ref in user_data.get("favourites", [])]
                user_dto.following = [ref.id for ref in user_data.get("following", [])]
                user_dto.image = user_data.get("image", "")
                user_dto.register_role = user_data.get("register_role", "")
                user_dto.username = user_data.get("username", "")
                user_dto.password = user_data.get("password", "")
                user_dto.emailForFans = user_data.get("emailForFans", "")
                user_dto.language = user_data.get("language", "")
                user_dto.location = user_data.get("location", "")
                user_dto.website = user_data.get("website", "")
                user_dto.darkMode = user_data.get("darkMode", False)
                user_dto.sellAlbumEmail = user_data.get("sellAlbumEmail", False)
                user_dto.sellAlbumWeb = user_data.get("sellAlbumWeb", False)
                user_dto.sellMerchEmail = user_data.get("sellMerchEmail", False)
                user_dto.sellMerchWeb = user_data.get("sellMerchWeb", False)
                user_dto.reviewEmail = user_data.get("reviewEmail", False)
                user_dto.reviewWeb = user_data.get("reviewWeb", False)
                user_dto.followEmail = user_data.get("followEmail", False)
                user_dto.followWeb = user_data.get("followWeb", False)
                user_dto.artistMusicEmail = user_data.get("artistMusicEmail", False)
                user_dto.artistMusicWeb = user_data.get("artistMusicWeb", False)
                user_dto.artistDiscountEmail = user_data.get("artistDiscountEmail", False)
                user_dto.artistDiscountWeb = user_data.get("artistDiscountWeb", False)
                user_dto.preferredPayment = user_data.get("preferredPayment", "")
                user_dto.cardNumber = user_data.get("cardNumber", "")
                user_dto.expirationDate = user_data.get("expirationDate", "")
                user_dto.cvc = user_data.get("cvc", "")
                user_dto.senderName = user_data.get("senderName", "")
                user_dto.senderAddress = user_data.get("senderAddress", "")
                user_dto.shippingDays = user_data.get("shippingDays", 0)
                user_dto.shippingMethod = user_data.get("shippingMethod", "")
            else:
                print(f"User with ID {user_id} does not exist.")
        except Exception as e:
            print(e)

        return user_dto.userdto_to_dict() if doc.exists else None

    def update_user(self, user_id, data):
        try:
            user_ref = self.collection.document(user_id)
            user_ref.update(data)
            return True
        except Exception as e:
            print(e)
            return False
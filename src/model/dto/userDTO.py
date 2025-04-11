import json

class UsersDTO():
    def __init__(self):
        self.userlist = []

    def insertUser(self, elem):
        self.userlist.append(elem)

    def userlist_to_json(self):
        return json.dumps(self.userlist)


class UserDTO():
    def __init__(self):
        self.id = None
        self.biography = None
        self.favourites = None
        self.following = None
        self.image = None
        self.username = None
        self.register_role = None
        self.email = None
        self.password = None
        self.emailForFans = None
        self.language = None
        self.location = None
        self.website = None
        self.darkMode = None
        self.sellAlbumEmail = None
        self.sellAlbumWeb = None
        self.sellMerchEmail = None
        self.sellMerchWeb = None
        self.reviewEmail = None
        self.reviewWeb = None
        self.followEmail = None
        self.followWeb = None
        self.artistMusicEmail = None
        self.artistMusicWeb = None
        self.artistDiscountEmail = None
        self.artistDiscountWeb = None
        self.preferredPayment = None
        self.cardNumber = None
        self.expirationDate = None
        self.cvc = None
        self.senderName = None
        self.senderAddress = None
        self.shippingDays = None
        self.shippingMethod = None


    def is_Empty(self):
        return (self.id is None and self.biography is None and self.favourites is None
        and self.following is None and self.image is None and self.username is None and self.register_role is None
        and self.email is None and self.password is None and self.emailForFans is None
        and self.language is None and self.location is None and self.website is None and self.darkMode is None
        and self.sellAlbumEmail is None and self.sellAlbumWeb is None and self.sellMerchEmail is None
        and self.sellMerchWeb is None and self.reviewEmail is None and self.reviewWeb is None
        and self.followEmail is None and self.followWeb is None and self.artistMusicEmail is None
        and self.artistMusicWeb is None and self.artistDiscountEmail is None and self.artistDiscountWeb
        is None and self.preferredPayment is None and self.cardNumber is None and self.expirationDate is None
        and self.cvc is None and self.senderName is None and self.senderAddress is None and self.shippingDays is None
        and self.shippingMethod is None)

    def get_id(self):
        return self.id

    def get_biography(self):
        return self.biography

    def get_favourites(self):
        return self.favourites

    def get_following(self):
        return self.following

    def get_image(self):
        return self.image

    def get_username(self):
        return self.username

    def get_register_role(self):
        return self.register_role

    def get_email(self):
        return self.email

    def get_password(self):
        return self.password
    
    def get_emailForFans(self):
        return self.emailForFans
    
    def get_language(self):
        return self.language
    
    def get_location(self):
        return self.location
    
    def get_website(self):
        return self.website
    
    def get_darkMode(self):
        return self.darkMode
    
    def get_sellAlbumEmail(self):
        return self.sellAlbumEmail
    
    def get_sellAlbumWeb(self):
        return self.sellAlbumWeb
    
    def get_sellMerchEmail(self):
        return self.sellMerchEmail
    
    def get_sellMerchWeb(self):
        return self.sellMerchWeb
    
    def get_reviewEmail(self):
        return self.reviewEmail
    
    def get_reviewWeb(self):
        return self.reviewWeb
    
    def get_followEmail(self):
        return self.followEmail
    
    def get_followWeb(self):
        return self.followWeb
    
    def get_artistMusicEmail(self):
        return self.artistMusicEmail
    
    def get_artistMusicWeb(self):
        return self.artistMusicWeb
    
    def get_artistDiscountEmail(self):
        return self.artistDiscountEmail
    
    def get_artistDiscountWeb(self):
        return self.artistDiscountWeb
    
    def get_preferredPayment(self):
        return self.preferredPayment
    
    def get_cardNumber(self):
        return self.cardNumber
    
    def get_expirationDate(self):
        return self.expirationDate
    
    def get_cvc(self):
        return self.cvc
    
    def get_senderName(self):
        return self.senderName
    
    def get_senderAddress(self):
        return self.senderAddress
    
    def get_shippingDays(self):
        return self.shippingDays
    
    def get_shippingMethod(self):
        return self.shippingMethod

    def set_id(self, id):
        self.id = id

    def set_biography(self, biography):
        self.biography = biography

    def set_favourites(self, favourites):
        self.favourites = favourites

    def set_following(self, following):
        self.following = following
 
    def userdto_to_dict(self):
        return {
            "id": self.id,
            "biography": self.biography,
            "favourites": self.favourites,
            "following": self.following,
            "image": self.image,
            "username": self.username,
            "register_role": self.register_role,
            "email": self.email,
            "password": self.password,
            "emailForFans": self.emailForFans,
            "language": self.language,
            "location": self.location,
            "website": self.website,
            "darkMode": self.darkMode,
            "sellAlbumEmail": self.sellAlbumEmail,
            "sellAlbumWeb": self.sellAlbumWeb,
            "sellMerchEmail": self.sellMerchEmail,
            "sellMerchWeb": self.sellMerchWeb,
            "reviewEmail": self.reviewEmail,
            "reviewWeb": self.reviewWeb,
            "followEmail": self.followEmail,
            "followWeb": self.followWeb,
            "preferredPayment": self.preferredPayment,
            "cardNumber": self.cardNumber,
            "expirationDate": self.expirationDate,
            "cvc": self.cvc,
            "senderName": self.senderName,
            "senderAddress": self.senderAddress,
            "shippingDays": self.shippingDays,
            "shippingMethod": self.shippingMethod,

        }
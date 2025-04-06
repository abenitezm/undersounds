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
        self.name = None

    def is_Empty(self):
        return (self.id is None and self.biography is None and self.favourites is None
        and self.following is None and self.image is None and self.name is None)

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

    def get_name(self):
        return self.name

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
            "name": self.name
        }
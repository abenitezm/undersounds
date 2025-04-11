import json

class SongsDTO():
    def __init__(self):
        self.songlist = []

    def insertSong(self, elem):
        self.songlist.append(elem)

    def songlist_to_json(self):
        return json.dumps(self.songlist)


class SongDTO():
    def __init__(self):
        self.id = None
        self.name = None
        self.trackLength = None
        self.album = None
        self.genre = None
        self.commentator = None
        self.comments = None
        self.url = None

    def is_Empty(self):
        return (self.id is None and self.name is None and self.trackLength 
        is None and self.album is None and self.genre is None)

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_trackLength(self):
        return self.trackLength

    def get_album(self):
        return self.album

    def get_genre(self):
        return self.genre

    def get_commentator(self):
        return self.commentator

    def get_comments(self):
        return self.comments

    def get_url(self):
        return self.url

    def set_id(self, id):
        self.id = id

    def set_name(self, name):
        self.name = name

    def set_trackLength(self, trackLength):
        self.trackLength = trackLength

    def set_album(self, album):
        self.album = album

    def set_genre(self, genre):
        self.genre = genre

    def set_commentator(self, commentator):
        self.commentator = commentator
    
    def set_comments(self, comments):
        self.comments = comments

    def set_url(self, url):
        self.url = url
    
    def songdto_to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "trackLength": self.trackLength,
            "album": self.album,
            "genre": self.genre,
            "comments": self.comments,
            "commentator": self.commentator,
            "url": self.url
        }
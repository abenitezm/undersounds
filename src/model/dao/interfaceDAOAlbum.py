from abc import ABC, abstractmethod
from typing import List, Optional

class InterfaceAlbumDAO(ABC):

   @abstractmethod
   def get_albums(self):
      pass
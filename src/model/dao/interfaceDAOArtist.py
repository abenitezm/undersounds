from abc import ABC, abstractmethod
from typing import List, Optional

class InterfaceArtistDAO(ABC):

   @abstractmethod
   def get_artists(self):
      pass
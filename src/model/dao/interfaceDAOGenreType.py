from abc import ABC, abstractmethod
from typing import List, Optional

class InterfaceGenreTypeDAO(ABC):

   @abstractmethod
   def get_genreType(self):
      pass
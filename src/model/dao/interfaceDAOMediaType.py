from abc import ABC, abstractmethod
from typing import List, Optional

class InterfaceMediaTypeDAO(ABC):

   @abstractmethod
   def get_mediaType(self):
      pass
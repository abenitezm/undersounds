from abc import ABC, abstractmethod
from typing import List, Optional

class InterfaceUserDAO(ABC):

   @abstractmethod
   def get_users(self):
      pass
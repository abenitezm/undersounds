from abc import ABC, abstractmethod
from typing import List, Optional

class InterfaceMerchTypeDAO(ABC):

   @abstractmethod
   def get_merchType(self):
      pass
from abc import ABC, abstractmethod
from typing import List, Optional

class InterfaceMerchDAO(ABC):

   @abstractmethod
   def get_merchs(self):
      pass
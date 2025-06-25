from abc import ABC, abstractmethod
from typing import Dict, List, Optional

class TypeWarriorRepositoryPort(ABC):

    @abstractmethod
    def create(self, name: str, description: str):
        """Crear un nuevo TypeWarrior"""
        pass

    @abstractmethod
    def get_all(self) -> List[Dict]:
        """Obtener todos los TypeWarriors"""
        pass

    @abstractmethod
    def get_by_id(self, id_: int) -> Optional[Dict]:
        """Obtener un TypeWarrior por su ID"""
        pass

    @abstractmethod
    def update(self, id_: int, name: str, description: str) -> Optional[Dict]:
        """Actualizar un TypeWarrior existente"""
        pass

    @abstractmethod
    def delete(self, id_: int) -> bool:
        """Eliminar un TypeWarrior por su ID"""
        pass

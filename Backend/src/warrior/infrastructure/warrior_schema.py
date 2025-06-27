from pydantic import BaseModel
from typing import Optional

class WarriorCreate(BaseModel):
    warrior_name: str
    breed_fk: int
    type_Warrior_fk: int
    power_fk: int
    warriors_health: int
    warriors_energy: int
    warriors_image: Optional[str]

class WarriorUpdate(BaseModel):
    warrior_name: Optional[str]
    breed_fk: Optional[int]
    type_Warrior_fk: Optional[int]
    power_fk: Optional[int]
    warriors_health: Optional[int]
    warriors_energy: Optional[int]
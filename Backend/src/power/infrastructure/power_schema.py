from pydantic import BaseModel
from typing import Optional


class PowerBase(BaseModel):
    name: str
    attack_power: int
    power_effect: str


class PowerCreate(PowerBase):
    name: Optional[str] = None
    attack_power: Optional[int] = None
    power_effect: Optional[str] = None


class PowerUpdate(BaseModel):
    name: Optional[str] = None
    attack_power: Optional[int] = None
    power_effect: Optional[str] = None


class PowerOut(PowerBase):
    id: int

    class Config:
        orm_mode = True

from pydantic import BaseModel

class PowerBase(BaseModel):
    Name: str
    Attack_Power: int
    Power_effect: str

class PowerCreate(PowerBase):
    pass

class PowerOut(PowerBase):
    Id: int

    class Config:
        orm_mode = True

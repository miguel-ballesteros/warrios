from pydantic import BaseModel

class BreedCreate(BaseModel):
    name: str
    breed_Resistance: str

class BreedUpdate(BaseModel):
    name: str
    breed_Resistance: str

class BreedOut(BaseModel):
    id: int
    name: str
    breed_Resistance: str

    class Config:
        orm_mode = True

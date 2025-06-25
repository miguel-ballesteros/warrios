from pydantic import BaseModel

class TypeWarriorBase(BaseModel):
    name: str
    description: str

class TypeWarriorCreate(TypeWarriorBase):
    pass

class TypeWarriorUpdate(TypeWarriorBase):
    pass

class TypeWarriorOut(TypeWarriorBase):
    id: int

    class Config:
        orm_mode = True

from pydantic import BaseModel

class CreateTypeWarriorCommand(BaseModel):
    name: str
    description: str

class UpdateTypeWarriorCommand(BaseModel):
    name: str
    description: str

from pydantic import BaseModel, EmailStr
from datetime import date

class UserCreate(BaseModel):
    user_name: str
    user_email: EmailStr
    user_password: str
    user_created: date

class UserLogin(BaseModel):
    user_email: EmailStr
    user_password: str

class UserOut(BaseModel):
    id: int
    user_name: str
    user_email: EmailStr
    user_created: date

    class Config:
        orm_mode = True

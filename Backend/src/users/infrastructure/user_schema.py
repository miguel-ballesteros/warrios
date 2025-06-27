from pydantic import BaseModel, EmailStr
from datetime import date

class UserBase(BaseModel):
    user_name: str
    user_email: EmailStr

class UserCreate(UserBase):
    user_password: str
    user_created: date

class UserLogin(BaseModel):
    user_email: EmailStr
    user_password: str

class UserOut(UserBase):
    id: int
    user_created: date

    class Config:
        orm_mode = True
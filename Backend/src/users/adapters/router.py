from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from src.users.application.service import UserService
from src.users.infrastructure.repository import UserRepository
from src.users.infrastructure.user_schema import UserCreate, UserLogin, UserOut
from typing import List

router = APIRouter(prefix="/users", tags=["Users"])
service = UserService(UserRepository())

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return service.register_user(db, user)

@router.post("/login", response_model=UserOut)
def login(data: UserLogin, db: Session = Depends(get_db)):
    return service.login_user(db, data)

@router.get("/", response_model=List[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    return service.get_all(db)

@router.get("/{user_id}", response_model=UserOut)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    return service.get_by_id(db, user_id)

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, data: UserCreate, db: Session = Depends(get_db)):
    return service.update(db, user_id, data)

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    if service.delete(db, user_id):
        return {"message": "User deleted"}
    raise HTTPException(status_code=404, detail="User not found")
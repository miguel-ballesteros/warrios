from passlib.context import CryptContext
from sqlalchemy.orm import Session
from src.users.infrastructure.user_schema import UserCreate, UserLogin, UserOut
from src.users.infrastructure.repository import UserRepository
from models.models import Users
from fastapi import HTTPException, status

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def register_user(self, db: Session, user_data: UserCreate):
        existing = self.repo.get_by_email(db, user_data.user_email)
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = pwd_context.hash(user_data.user_password)
        user_data.user_password = hashed_password
        return self.repo.create(db, user_data)

    def login_user(self, db: Session, login_data: UserLogin):
        user = self.repo.get_by_email(db, login_data.user_email)
        if not user or not pwd_context.verify(login_data.user_password, user.user_password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user

    def get_all(self, db: Session):
        return self.repo.get_all(db)

    def get_by_id(self, db: Session, user_id: int):
        user = self.repo.get_by_id(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def update(self, db: Session, user_id: int, data: UserCreate):
        return self.repo.update(db, user_id, data)

    def delete(self, db: Session, user_id: int):
        return self.repo.delete(db, user_id)

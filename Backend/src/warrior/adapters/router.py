from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from src.warrior.infrastructure.warrior_schema import WarriorCreate, WarriorUpdate
from src.warrior.infrastructure.repository import WarriorRepository
from src.warrior.application.service import WarriorService

router = APIRouter(prefix="/warriors", tags=["Warriors"])

@router.post("/")
def create_warrior(command: WarriorCreate, db: Session = Depends(get_db)):
    service = WarriorService(WarriorRepository(db))
    return service.create(command)

@router.get("/")
def get_all_warriors(db: Session = Depends(get_db)):
    service = WarriorService(WarriorRepository(db))
    return service.get_all()

@router.get("/{id_}")
def get_warrior(id_: int, db: Session = Depends(get_db)):
    service = WarriorService(WarriorRepository(db))
    warrior = service.get_by_id(id_)
    if not warrior:
        raise HTTPException(status_code=404, detail="Warrior not found")
    return warrior

@router.put("/{id_}")
def update_warrior(id_: int, command: WarriorUpdate, db: Session = Depends(get_db)):
    service = WarriorService(WarriorRepository(db))
    return service.update(id_, command)

@router.delete("/{id_}")
def delete_warrior(id_: int, db: Session = Depends(get_db)):
    service = WarriorService(WarriorRepository(db))
    if not service.delete(id_):
        raise HTTPException(status_code=404, detail="Warrior not found")
    return {"message": "Warrior deleted"}
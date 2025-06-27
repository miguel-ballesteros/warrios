from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from src.power.infrastructure.power_schema import PowerCreate, PowerOut
from src.power.application.service import power_service

router = APIRouter(prefix="/powers", tags=["Powers"])

@router.get("/", response_model=list[PowerOut])
def read_powers(db: Session = Depends(get_db)):
    return power_service.get_powers(db)

@router.get("/{power_id}", response_model=PowerOut)
def read_power(power_id: int, db: Session = Depends(get_db)):
    db_power = power_service.get_power(db, power_id)
    if db_power is None:
        raise HTTPException(status_code=404, detail="Power not found")
    return db_power

@router.put("/{power_id}", response_model=PowerOut)
def update_power(power_id: int, power: PowerCreate, db: Session = Depends(get_db)):
    return power_service.update_power(db, power_id, power)

@router.post("/", response_model=PowerOut)
def create_power(power: PowerCreate, db: Session = Depends(get_db)):
    return power_service.create_power(db, power)

@router.delete("/{power_id}", response_model=PowerOut)
def delete_power(power_id: int, db: Session = Depends(get_db)):
    deleted = power_service.delete_power(db, power_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Power not found")
    return deleted

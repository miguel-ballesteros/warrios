from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from loobys.infrastructure.repository import LoobyRepository
from loobys.application.service import LoobyService
from loobys.infrastructure.looby_schema import LoobyCreate, LoobyUpdate

router = APIRouter(prefix="/loobys", tags=["Loobys"])

@router.post("/")
def create_looby(data: LoobyCreate, db: Session = Depends(get_db)):
    repo = LoobyRepository(db)
    service = LoobyService(repo)
    return service.create(data)

@router.get("/")
def list_loobys(db: Session = Depends(get_db)):
    repo = LoobyRepository(db)
    service = LoobyService(repo)
    return service.get_all()

@router.get("/{looby_id}")
def get_looby(looby_id: int, db: Session = Depends(get_db)):
    repo = LoobyRepository(db)
    service = LoobyService(repo)
    looby = service.get_by_id(looby_id)
    if looby:
        return looby
    raise HTTPException(status_code=404, detail="Looby not found")

@router.put("/{looby_id}")
def update_looby(looby_id: int, data: LoobyUpdate, db: Session = Depends(get_db)):
    repo = LoobyRepository(db)
    service = LoobyService(repo)
    updated = service.update(looby_id, data)
    if updated:
        return updated
    raise HTTPException(status_code=404, detail="Looby not found")

@router.delete("/{looby_id}")
def delete_looby(looby_id: int, db: Session = Depends(get_db)):
    repo = LoobyRepository(db)
    service = LoobyService(repo)
    if service.delete(looby_id):
        return {"message": "Looby deleted"}
    raise HTTPException(status_code=404, detail="Looby not found")

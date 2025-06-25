from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from ..application.command import CreateTypeWarriorCommand, UpdateTypeWarriorCommand
from ..application.service import TypeWarriorService
from ..infrastructure.repository import TypeWarriorRepository
from core.database import get_db  # Asegúrate que tienes esta función en core.database

router = APIRouter(prefix="/type-warriors", tags=["TypeWarrior"])


def get_service(db: Session = Depends(get_db)):
    repo = TypeWarriorRepository(db)
    return TypeWarriorService(repo)


@router.post("/")
def create_type(
    command: CreateTypeWarriorCommand,
    service: TypeWarriorService = Depends(get_service),
):
    return service.create(command)


@router.get("/")
def get_all_types(service: TypeWarriorService = Depends(get_service)):
    return service.get_all()


@router.get("/{id_}")
def get_by_id(id_: int, service: TypeWarriorService = Depends(get_service)):
    result = service.get_by_id(id_)
    if not result:
        raise HTTPException(status_code=404, detail="TypeWarrior not found")
    return result


@router.put("/{id_}")
def update(
    id_: int,
    command: UpdateTypeWarriorCommand,
    service: TypeWarriorService = Depends(get_service),
):
    result = service.update(id_, command)
    if not result:
        raise HTTPException(status_code=404, detail="TypeWarrior not found")
    return result


@router.delete("/{id_}")
def delete(id_: int, service: TypeWarriorService = Depends(get_service)):
    success = service.delete(id_)
    if not success:
        raise HTTPException(status_code=404, detail="TypeWarrior not found")
    return {"message": "Deleted successfully"}

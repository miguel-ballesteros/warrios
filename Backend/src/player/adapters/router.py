from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db  
from src.player.infrastructure.repository import PlayerRepository
from src.player.application.service import PlayerService
from src.player.infrastructure.player_schema import PlayerCreate, PlayerUpdate, PlayerOut

router = APIRouter(prefix="/players", tags=["Players"])

def get_service(db: Session = Depends(get_db)):
    repo = PlayerRepository(db)
    return PlayerService(repo)

@router.post("/", response_model=PlayerOut)
def create_player(command: PlayerCreate, service: PlayerService = Depends(get_service)):
    return service.create(command)

@router.get("/", response_model=list[PlayerOut])
def get_all(service: PlayerService = Depends(get_service)):
    return service.get_all()

@router.get("/{id_}", response_model=PlayerOut)
def get_by_id(id_: str, service: PlayerService = Depends(get_service)):
    player = service.get_by_id(id_)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

@router.put("/{id_}", response_model=PlayerOut)
def update(id_: str, command: PlayerUpdate, service: PlayerService = Depends(get_service)):
    updated = service.update(id_, command)
    if not updated:
        raise HTTPException(status_code=404, detail="Player not found")
    return updated

@router.delete("/{id_}")
def delete(id_: str, service: PlayerService = Depends(get_service)):
    success = service.delete(id_)
    if not success:
        raise HTTPException(status_code=404, detail="Player not found")
    return {"ok": True}

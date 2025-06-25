from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from games.infrastructure.repository import GameRepository
from games.application.service import GameService
from games.infrastructure.game_schema import GameCreate, GameUpdate

router = APIRouter(prefix="/games", tags=["Games"])

@router.post("/")
def create_game(data: GameCreate, db: Session = Depends(get_db)):
    repo = GameRepository(db)
    service = GameService(repo)
    return service.create(data)

@router.get("/")
def list_games(db: Session = Depends(get_db)):
    repo = GameRepository(db)
    service = GameService(repo)
    return service.list_all()

@router.get("/{game_id}")
def get_game(game_id: int, db: Session = Depends(get_db)):
    repo = GameRepository(db)
    service = GameService(repo)
    game = service.get(game_id)
    if game:
        return game
    raise HTTPException(status_code=404, detail="Game not found")

@router.put("/{game_id}")
def update_game(game_id: int, data: GameUpdate, db: Session = Depends(get_db)):
    repo = GameRepository(db)
    service = GameService(repo)
    game = service.update(game_id, data)
    if game:
        return game
    raise HTTPException(status_code=404, detail="Game not found")

@router.delete("/{game_id}")
def delete_game(game_id: int, db: Session = Depends(get_db)):
    repo = GameRepository(db)
    service = GameService(repo)
    if service.delete(game_id):
        return {"message": "Game deleted"}
    raise HTTPException(status_code=404, detail="Game not found")

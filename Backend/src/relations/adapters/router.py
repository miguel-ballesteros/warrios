from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from relations.infrastructure.repository    import RelationshipRepository
from relations.application.services import RelationshipService

router = APIRouter(prefix="/relations", tags=["Relations"])


@router.post("/player/{player_id}/warrior/{warrior_id}")
def assign_warrior_to_player(player_id: str, warrior_id: int, db: Session = Depends(get_db)):
    repo = RelationshipRepository(db)
    service = RelationshipService(repo)
    service.assign_warrior(player_id, warrior_id)
    return {"message": "Warrior assigned to player."}


@router.delete("/player/{player_id}/warrior/{warrior_id}")
def unassign_warrior_from_player(player_id: str, warrior_id: int, db: Session = Depends(get_db)):
    repo = RelationshipRepository(db)
    service = RelationshipService(repo)
    if service.remove_warrior(player_id, warrior_id):
        return {"message": "Warrior removed from player."}
    raise HTTPException(status_code=404, detail="Relation not found.")


@router.post("/user/{user_id}/player/{player_id}")
def assign_player_to_user(user_id: int, player_id: str, db: Session = Depends(get_db)):
    repo = RelationshipRepository(db)
    service = RelationshipService(repo)
    service.assign_player(user_id, player_id)
    return {"message": "Player assigned to user."}


@router.delete("/user/{user_id}/player/{player_id}")
def unassign_player_from_user(user_id: int, player_id: str, db: Session = Depends(get_db)):
    repo = RelationshipRepository(db)
    service = RelationshipService(repo)
    if service.remove_player(user_id, player_id):
        return {"message": "Player removed from user."}
    raise HTTPException(status_code=404, detail="Relation not found.")

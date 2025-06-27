from sqlalchemy.orm import Session
from src.relations.infrastructure.repository import RelationshipRepository


class RelationshipService:
    def __init__(self, repo: RelationshipRepository):
        self.repo = repo

    def assign_warrior(self, db: Session, player_id: str, warrior_id: int):
        self.repo.assign_warrior_to_player( player_id, warrior_id)

    def remove_warrior(self, db: Session, player_id: str, warrior_id: int):
        return self.repo.remove_warrior_from_player( player_id, warrior_id)

    def assign_player(self, db: Session, user_id: int, player_id: str):
        self.repo.assign_player_to_user( user_id, player_id)

    def remove_player(self, db: Session, user_id: int, player_id: str):
        return self.repo.remove_player_from_user(db, user_id, player_id)
    
    def get_warriors_by_player(self, player_id: str):
      return self.repo.get_warriors_by_player(player_id)

    def get_players_by_user(self, user_id: int):
        return self.repo.get_players_by_user(user_id)
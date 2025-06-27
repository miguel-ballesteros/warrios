from sqlalchemy.orm import Session
from models.models import PlayerWarrior, UserPlayer


class RelationshipRepository:
    def __init__(self, db: Session):
        self.db = db

    # ----- Warrior <-> Player -----

    def assign_warrior_to_player(self, player_id: str, warrior_id: int):
        relation = PlayerWarrior(player_id=player_id, warrior_id=warrior_id)
        self.db.add(relation)
        self.db.commit()
        self.db.refresh(relation)
        return relation

    def remove_warrior_from_player(self, player_id: str, warrior_id: int):
        relation = self.db.query(PlayerWarrior).filter_by(
            player_id=player_id,
            warrior_id=warrior_id
        ).first()
        if relation:
            self.db.delete(relation)
            self.db.commit()
            return True
        return False

    def get_warriors_by_player(self, player_id: str):
        return self.db.query(PlayerWarrior).filter_by(player_id=player_id).all()

    def assign_player_to_user(self, user_id: int, player_id: str):
        relation = UserPlayer(user_id=user_id, player_id=player_id)
        self.db.add(relation)
        self.db.commit()
        self.db.refresh(relation)
        return relation

    def remove_player_from_user(self, user_id: int, player_id: str):
        relation = self.db.query(UserPlayer).filter_by(
            user_id=user_id,
            player_id=player_id
        ).first()
        if relation:
            self.db.delete(relation)
            self.db.commit()
            return True
        return False

    def get_players_by_user(self, user_id: int):
        return self.db.query(UserPlayer).filter_by(user_id=user_id).all()

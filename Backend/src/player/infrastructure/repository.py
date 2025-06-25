from sqlalchemy.orm import Session
from models.models import Player
from src.player.infrastructure.player_schema import PlayerCreate, PlayerUpdate


class PlayerRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, player: PlayerCreate):
        db_item = Player(**player.dict())
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def get_all(self):
        return self.db.query(Player).all()

    def get_by_id(self, id_: str):
        return self.db.query(Player).filter(Player.id_player == id_).first()

    def update(self, id_: str, data: PlayerUpdate):
        db_item = self.get_by_id(id_)
        if db_item:
            for key, value in data.dict(exclude_unset=True).items():
                setattr(db_item, key, value)
            self.db.commit()
            self.db.refresh(db_item)
            return db_item
        return None

    def delete(self, id_: str):
        db_item = self.get_by_id(id_)
        if db_item:
            self.db.delete(db_item)
            self.db.commit()
            return True
        return False

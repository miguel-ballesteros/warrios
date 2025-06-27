from sqlalchemy.orm import Session
from models.models import Games
from src.games.infrastructure.game_schema import GameCreate, GameUpdate

class GameRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, data: GameCreate):
        db_game = Games(**data.dict())
        self.db.add(db_game)
        self.db.commit()
        self.db.refresh(db_game)
        return db_game

    def get_all(self):
        return self.db.query(Games).all()

    def get_by_id(self, game_id: int):
        return self.db.query(Games).filter(Games.games_id == game_id).first()

    def update(self, game_id: int, data: GameUpdate):
        db_game = self.get_by_id(game_id)
        if db_game:
            for key, value in data.dict(exclude_unset=True).items():
                setattr(db_game, key, value)
            self.db.commit()
            self.db.refresh(db_game)
            return db_game
        return None

    def delete(self, game_id: int):
        db_game = self.get_by_id(game_id)
        if db_game:
            self.db.delete(db_game)
            self.db.commit()
            return True
        return False

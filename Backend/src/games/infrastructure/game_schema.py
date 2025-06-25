from pydantic import BaseModel
from datetime import date

class GameCreate(BaseModel):
    games_nick_name: str
    games_status: str
    games_score: int
    games_created: date

class GameUpdate(BaseModel):
    games_nick_name: str | None = None
    games_status: str | None = None
    games_score: int | None = None
    games_created: date | None = None

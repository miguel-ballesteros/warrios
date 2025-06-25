from pydantic import BaseModel
from datetime import date

class LoobyCreate(BaseModel):
    looby_code: str
    looby_player_1: str
    looby_player_2: str
    looby_result: str
    looby_created: date

class LoobyUpdate(BaseModel):
    looby_code: str | None = None
    looby_player_1: str | None = None
    looby_player_2: str | None = None
    looby_result: str | None = None
    looby_created: date | None = None

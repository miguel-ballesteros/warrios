from pydantic import BaseModel
from typing import Optional


class PlayerCreate(BaseModel):
    id_player: str
    nickname: str
    life: int
    record: int
    player_live: int


class PlayerUpdate(BaseModel):
    life: Optional[int]
    record: Optional[int]
    player_live: Optional[int]


class PlayerOut(BaseModel):
    id_player: str
    nickname: str
    life: int
    record: int
    player_live: int

    class Config:
        orm_mode = True

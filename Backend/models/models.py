
from sqlalchemy import Column, Integer, String, Date, LargeBinary, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Power(Base):
    __tablename__ = "power"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)  # ✅ longitud definida
    attack_power = Column(Integer, nullable=False)
    power_effect = Column(String(50), nullable=False)  # ✅ longitud definida


class Breed(Base):
    __tablename__ = "breed"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    breed_Resistance = Column(String(100), nullable=False)


class TypeWarrior(Base):
    __tablename__ = "type_Warrior"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    description = Column(String(200), nullable=False)


class Warriors(Base):
    __tablename__ = "warriors"

    warrior_id = Column(Integer, primary_key=True, autoincrement=True)
    warrior_name = Column(String(50), nullable=False)
    breed_fk = Column(Integer, ForeignKey("breed.id"), nullable=False)
    type_Warrior_fk = Column(Integer, ForeignKey("type_Warrior.id"), nullable=False)
    power_fk = Column(Integer, ForeignKey("power.id"), nullable=False)
    warriors_health = Column(Integer, nullable=False)
    warriors_energy = Column(Integer, nullable=False)
    warriors_image = Column(LargeBinary, nullable=True)


class Player(Base):
    __tablename__ = "player"

    id_player = Column(String(50), primary_key=True)
    nickname = Column(String(50), nullable=False, unique=True)
    life = Column(Integer, nullable=False)
    record = Column(Integer, nullable=False)
    player_live = Column(Integer, nullable=False)


class PlayerWarrior(Base):
    __tablename__ = "player_warrior"

    id = Column(Integer, primary_key=True, autoincrement=True)
    player_id = Column(String(50), ForeignKey("player.id_player"))
    warrior_id = Column(Integer, ForeignKey("warriors.warrior_id"))

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(50), nullable=False)
    user_email = Column(String(100), nullable=False, unique=True)
    user_password = Column(String(255), nullable=False)
    user_created = Column(Date, nullable=False)

class UserPlayer(Base):
    __tablename__ = "user_player"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    player_id = Column(String(50), ForeignKey("player.id_player"))

class Games(Base):
    __tablename__ = "games"

    games_id = Column(Integer, primary_key=True, autoincrement=True)
    games_nick_name = Column(String(50), nullable=False)
    games_status = Column(String(20), nullable=False)
    games_score = Column(Integer, nullable=False)
    games_created = Column(Date, nullable=False)


class Loobys(Base):
    __tablename__ = "loobys"

    looby_id = Column(Integer, primary_key=True, autoincrement=True)
    looby_code = Column(String(200), nullable=False, unique=True)
    looby_player_1 = Column(String(50), nullable=False)
    looby_player_2 = Column(String(50), nullable=False)
    looby_result = Column(String(20), nullable=False)
    looby_created = Column(Date, nullable=False)

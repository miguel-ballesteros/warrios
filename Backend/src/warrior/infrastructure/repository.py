import base64
from sqlalchemy.orm import Session
from models.models import Warriors
from src.warrior.infrastructure.warrior_schema import WarriorCreate, WarriorUpdate


class WarriorRepository:
    def __init__(self, db: Session):
        self.db = db

    def _decode_image(self, base64_string: str) -> bytes:
        if "," in base64_string:
            base64_string = base64_string.split(",")[1]  # remover encabezado tipo 'data:image/jpeg;base64,'
        return base64.b64decode(base64_string)

    def _encode_image(self, warrior: Warriors):
        if warrior.warriors_image:
            warrior.warriors_image = (
                "data:image/jpeg;base64,"
                + base64.b64encode(warrior.warriors_image).decode("utf-8")
            )
        return warrior

    def create(self, data: WarriorCreate):
        data_dict = data.dict()

        if data_dict.get("warriors_image"):
            try:
                data_dict["warriors_image"] = self._decode_image(data_dict["warriors_image"])
            except Exception as e:
                raise ValueError(f"Error decoding image: {e}")

        db_item = Warriors(**data_dict)
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return self._encode_image(db_item)

    def get_all(self):
        warriors = self.db.query(Warriors).all()
        return [self._encode_image(w) for w in warriors]

    def get_by_id(self, id_: int):
        warrior = self.db.query(Warriors).filter(Warriors.warrior_id == id_).first()
        return self._encode_image(warrior) if warrior else None

    def update(self, id_: int, data: WarriorUpdate):
        db_item = self.get_by_id(id_)
        if db_item:
            data_dict = data.dict(exclude_unset=True)

            if "warriors_image" in data_dict and data_dict["warriors_image"]:
                try:
                    data_dict["warriors_image"] = self._decode_image(data_dict["warriors_image"])
                except Exception as e:
                    raise ValueError(f"Error decoding image during update: {e}")

            for key, value in data_dict.items():
                setattr(db_item, key, value)

            self.db.commit()
            self.db.refresh(db_item)
            return self._encode_image(db_item)
        return None

    def delete(self, id_: int):
        db_item = self.get_by_id(id_)
        if db_item:
            self.db.delete(db_item)
            self.db.commit()
            return True
        return False

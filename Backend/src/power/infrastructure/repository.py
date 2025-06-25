from sqlalchemy.orm import Session
from models.models import Power
from power.infrastructure.power_schema import PowerCreate, PowerUpdate

class PowerRepository:
    def get_all(self, db: Session):
        return db.query(Power).all()

    def get_by_id(self, db: Session, power_id: int):
        return db.query(Power).filter(Power.id == power_id).first()

    def create(self, db: Session, power: PowerCreate):
        new_power = Power(**power.dict())
        db.add(new_power)
        db.commit()
        db.refresh(new_power)
        return new_power

    def update(self, db: Session, power_id: int, power_data: PowerUpdate):
        db_power = self.get_by_id(db, power_id)
        if db_power:
            for key, value in power_data.dict(exclude_unset=True).items():
                setattr(db_power, key, value)
            db.commit()
            db.refresh(db_power)
            return db_power
        return None

    def delete(self, db: Session, power_id: int):
        db_power = self.get_by_id(db, power_id)
        if db_power:
            db.delete(db_power)
            db.commit()
            return db_power
        return None

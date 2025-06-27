from sqlalchemy.orm import Session
from src.power.infrastructure.repository import PowerRepository
from src.power.infrastructure.power_schema import PowerCreate, PowerUpdate

class PowerService:
    def __init__(self):
        self.repository = PowerRepository()

    def get_powers(self, db: Session):
        return self.repository.get_all(db)

    def get_power(self, db: Session, power_id: int):
        return self.repository.get_by_id(db, power_id)

    def create_power(self, db: Session, power: PowerCreate):
        return self.repository.create(db, power)

    def update_power(self, db: Session, power_id: int, power: PowerUpdate):
        return self.repository.update(db, power_id, power)

    def delete_power(self, db: Session, power_id: int):
        return self.repository.delete(db, power_id)

power_service = PowerService()
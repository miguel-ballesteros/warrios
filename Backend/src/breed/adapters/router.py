from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db  
from breed.application.service import BreedService
from breed.infrastructure.repository    import BreedRepository
from breed.infrastructure.breed_schema import BreedCreate, BreedUpdate

router = APIRouter(prefix="/breed", tags=["Breed"])

def get_service(db: Session = Depends(get_db)):
    repo = BreedRepository(db)
    return BreedService(repo)

@router.post("/")
def create_breed(breed: BreedCreate, service: BreedService = Depends(get_service)):
    return service.create(breed)

@router.get("/")
def get_all_breeds(service: BreedService = Depends(get_service)):
    return service.get_all()

@router.get("/{breed_id}")
def get_breed_by_id(breed_id: int, service: BreedService = Depends(get_service)):
    return service.get_by_id(breed_id)

@router.put("/{breed_id}")
def update_breed(breed_id: int, breed_data: BreedUpdate, service: BreedService = Depends(get_service)):
    return service.update(breed_id, breed_data)

@router.delete("/{breed_id}")
def delete_breed(breed_id: int, service: BreedService = Depends(get_service)):
    return service.delete(breed_id)

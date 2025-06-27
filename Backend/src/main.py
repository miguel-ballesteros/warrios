from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.type_warrior.adapters.router import router as type_warrior_router
from src.power.adapters.router import router as power_router
from src.player.adapters.router import router as player_router
from src.breed.adapters.router import router as breed_router
from src.warrior.adapters.router import router as warrior_router
from src.relations.adapters.router import router as relations_router
from src.games.adapters.router import router as games_router
from src.loobys.adapters.router import router as looby_router
from src.users.adapters.router import router as user_router

base_url = "/api/v1"

app = FastAPI(
    title="Guerreros API",
    version="1.0.0",
    openapi_url=f"{base_url}/openapi.json",
    docs_url=f"{base_url}/docs",
    redoc_url=f"{base_url}/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(type_warrior_router, prefix=base_url)

app.include_router(power_router, prefix=base_url)

app.include_router(player_router, prefix=base_url)

app.include_router(breed_router, prefix=base_url)

app.include_router(warrior_router, prefix=base_url)

app.include_router(relations_router, prefix=base_url)

app.include_router(games_router, prefix=base_url)

app.include_router(looby_router, prefix=base_url)

app.include_router(user_router, prefix=base_url)

@app.get("/")
def root():
    return {"message": "Bienvenido a Guerreros API 🛡️"}

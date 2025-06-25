from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from type_warrior.adapters.router import router as type_warrior_router
from power.adapters.router import router as power_router
from player.adapters.router import router as player_router
from breed.adapters.router import router as breed_router
from warrior.adapters.router import router as warrior_router
from relations.adapters.router import router as relations_router
from games.adapters.router import router as games_router
from loobys.adapters.router import router as looby_router

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

@app.get("/")
def root():
    return {"message": "Bienvenido a Guerreros API 🛡️"}

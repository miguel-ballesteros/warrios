import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

from core.config import DATABASE_URL

Base = declarative_base()

# Motor síncrono para Alembic (usa pymysql)
sync_engine = create_engine(DATABASE_URL)
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Solo crea async engine si NO estamos en una migración
if not os.getenv("ALEMBIC_RUN"):
    # Cambia a driver async: pymysql -> aiomysql
    DATABASE_URL_ASYNC = DATABASE_URL.replace("mysql+pymysql://", "mysql+aiomysql://")
    
    async_engine = create_async_engine(DATABASE_URL_ASYNC, echo=True)

    AsyncSessionLocal = sessionmaker(
        bind=async_engine,
        expire_on_commit=False,
        class_=AsyncSession
    )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

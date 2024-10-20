from sqlalchemy import URL
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.infrastructure.config import DB_HOST, DB_NAME, DB_USER, DB_PASSWORD 

DATABASE_URL = URL.create(
    "postgresql+psycopg",
    username=DB_USER,
    password=DB_PASSWORD, 
    host=DB_HOST,
    database=DB_NAME
)

engine = create_async_engine(DATABASE_URL)

async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with async_session() as session:
        yield session

async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
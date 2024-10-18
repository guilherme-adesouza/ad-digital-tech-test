import os
from sqlite3 import IntegrityError
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import databases
import sqlalchemy

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = f"postgresql+psycopg://{os.getenv("DATABASE_USER")}:{os.getenv("DATABASE_PASSWORD")}@{os.getenv("DATABASE_HOST")}:{os.getenv("DATABASE_PORT")}/{os.getenv("DATABASE_NAME")}"

database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

youtube_links = sqlalchemy.Table(
    "link_keeper",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("url", sqlalchemy.String, unique=True),
)

# Create a FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Create the database tables
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)

class YouTubeLink(BaseModel):
    url: str

@app.post("/links/")
async def create_link(link: YouTubeLink):
    query = youtube_links.insert().values(url=link.url)
    try:
        id = await database.execute(query)
        return {**link.dict(), "id": id}
    except IntegrityError:
        raise HTTPException(status_code=400, detail="This URL already exists.")

@app.get("/links/")
async def read_links():
    query = youtube_links.select()
    results = await database.fetch_all(query)
    return [{"id": row["id"], "url": row["url"]} for row in results]

@app.delete("/links/{link_id}")
async def delete_link(link_id: int):
    query = youtube_links.select().where(youtube_links.c.id == link_id)
    link = await database.fetch_one(query)
    if link is None:
        raise HTTPException(status_code=404, detail="Link not found")
    
    delete_query = youtube_links.delete().where(youtube_links.c.id == link_id)
    await database.execute(delete_query)
    return {"id": link_id, "url": link["url"]}

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

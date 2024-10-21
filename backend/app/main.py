from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.errors import ConflictError
from app.schemas.url_schemas import LinkCreateSchema, LinkResponseSchema
from app.application.use_cases import AddLinkUseCase, ListLinksUseCase, RemoveLinkUseCase
from app.infrastructure.repositories import LinkRepository
from app.database import get_db, create_tables

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.on_event("startup")
async def startup_event():
    await create_tables()

@app.post("/links/", response_model=LinkResponseSchema)
async def create_url(url_data: LinkCreateSchema, db: AsyncSession = Depends(get_db)):
    repository = LinkRepository(db)
    use_case = AddLinkUseCase(repository)

    try:
        new_url = await use_case.execute(url_data.url)
        return new_url
    except ConflictError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/links/", response_model=list[LinkResponseSchema])
async def list_urls(db: AsyncSession = Depends(get_db)):
    repository = LinkRepository(db)
    use_case = ListLinksUseCase(repository)

    return await use_case.execute()

@app.delete("/links/{link_id}", responses={204: {"model": None}})
async def delete_url(link_id: int, db: AsyncSession = Depends(get_db)):
    repository = LinkRepository(db)
    use_case = RemoveLinkUseCase(repository)

    success = await use_case.execute(link_id)
    if not success:
        raise HTTPException(status_code=404, detail="Link not found")

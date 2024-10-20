from pydantic import BaseModel

class LinkCreateSchema(BaseModel):
    url: str

class LinkResponseSchema(BaseModel):
    id: int
    url: str

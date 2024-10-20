from sqlalchemy import Column, Integer, String
from app.database import Base

class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)

    class Config:
        orm_mode = True

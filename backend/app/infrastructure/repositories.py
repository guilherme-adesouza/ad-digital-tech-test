from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import insert, select, delete
from ..domain.models import Link

class LinkRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def add(self, link: Link) -> int:
        stmt = insert(Link).values(url=link.url).returning(Link.id)
        result = await self.db.execute(stmt)
        link_id = result.scalar()
        await self.db.commit()
        return link_id

    async def list_all(self):
        stmt = select(Link)
        result = await self.db.execute(stmt)
        return result.scalars().all()

    async def remove(self, url_id: int) -> bool:
        stmt = delete(Link).where(Link.id == url_id)
        result = await self.db.execute(stmt)
        await self.db.commit()
        return result.rowcount > 0

    async def get_by_url(self, url: str) -> bool:
        query = select(Link).where(Link.url == url)
        result = await self.db.execute(query)
        return result.scalar()

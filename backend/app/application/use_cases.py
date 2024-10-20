from ..domain.services import LinkService
from ..infrastructure.repositories import LinkRepository

class AddLinkUseCase:
    def __init__(self, repository: LinkRepository):
        self.repository = repository

    async def execute(self, url: str):
        new_url = LinkService.create_url(url)
        id = await self.repository.add(new_url)
        new_url.id = id
        return new_url

class ListLinksUseCase:
    def __init__(self, repository: LinkRepository):
        self.repository = repository

    async def execute(self):
        return await self.repository.list_all()

class RemoveLinkUseCase:
    def __init__(self, repository: LinkRepository):
        self.repository = repository

    async def execute(self, url_id: int) -> bool:
        return await self.repository.remove(url_id)

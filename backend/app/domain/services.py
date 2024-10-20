from .models import Link

class LinkService:
    @staticmethod
    def create_url(url: str) -> Link:
        if not url.startswith("http"):
            raise ValueError("URL must start with 'http' or 'https'")
        return Link(url=url)

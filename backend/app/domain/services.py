import re
from .models import Link

class LinkService:
    def is_youtube_url(url):
        youtube_patterns = [
            r'^https?://(www\.)?youtube\.com',  # Domínios principais
            r'^https?://(www\.)?youtu\.be',     # URLs encurtadas
            r'^https?://(www\.)?youtube\.com/@' # URLs de canais personalizados
        ]
        
        return any(re.match(pattern, url) for pattern in youtube_patterns)

    @staticmethod
    def create_url(url: str) -> Link:
        if not LinkService.is_youtube_url(url):
            raise ValueError("URL must be from Youtube")
        return Link(url=url)

import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "Link Keeper")
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

DB_HOST = os.getenv("DATABASE_HOST", "localhost")
DB_PORT = os.getenv("DATABASE_PORT", 5432)
DB_NAME = os.getenv("DATABASE_NAME", "link_keeper")
DB_USER = os.getenv("DATABASE_USER", "postgres")
DB_PASSWORD = os.getenv("DATABASE_PASSWORD", "")

import os
from dotenv import load_dotenv

load_dotenv()

# Vector DB
VECTOR_DB_PATH = "./vector_db"

# Embedding
EMBED_MODEL = "all-MiniLM-L6-v2"

# Chunking
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

# LLM Provider
LLM_PROVIDER = os.getenv("LLM_PROVIDER", "ollama")

# Ollama Config
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3")

# OpenAI Config
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
from sentence_transformers import SentenceTransformer
from config.settings import EMBED_MODEL

model = SentenceTransformer(EMBED_MODEL)

def generate_embeddings(chunks):
 embeddings = model.encode(chunks)

 return embeddings
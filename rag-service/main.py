from fastapi import FastAPI
from pydantic import BaseModel

from utils.pdf_loader import extract_text
from utils.chunker import chunk_text
from services.embedding_service import generate_embeddings
from services.vector_store import store_embeddings

app = FastAPI()

class ProcessRequest(BaseModel):

 filePath:str
 documentId:str

@app.post("/process")
def process_document(data: ProcessRequest):

    try:
        print("🚀 Processing started")
        print("File path:", data.filePath)

        text = extract_text(data.filePath)
        print("✅ Text extracted")

        chunks = chunk_text(text)
        print("✅ Chunks created:", len(chunks))

        embeddings = generate_embeddings(chunks)
        print("✅ Embeddings generated")

        store_embeddings(chunks, embeddings, data.documentId)
        print("✅ Stored in vector DB")

        return {"status": "completed"}

    except Exception as e:
        print("❌ ERROR:", str(e))
        return {"status": "error"}
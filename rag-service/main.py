import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel

from utils.pdf_loader import extract_text
from utils.chunker import chunk_text
from services.embedding_service import generate_embeddings
from services.vector_store import store_embeddings
from services.embedding_service import model
from services.retrieval_service import retrieve_chunks
from services.llm_service import generate_answer

load_dotenv()
print("API KEY LOADED:", os.getenv("OPENAI_API_KEY")[:10])

app = FastAPI()

class ProcessRequest(BaseModel):
 filePath:str
 documentId:str

class QueryRequest(BaseModel):
    question: str

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

@app.post("/query")
def query_rag(data: QueryRequest):

    try:
        question = data.question

        # 1. Convert question → embedding
        query_embedding = model.encode(question)

        # 2. Retrieve chunks
        documents, metadatas = retrieve_chunks(query_embedding)
        # 🔍 DEBUG LOGS (TEMPORARY)
        print("\n===== RAG DEBUG =====")
        print("Question:", question)
        print("\nNumber of chunks retrieved:", len(documents))
        if documents:
            print("\nFirst chunk preview:\n", documents[0][:200])
        print("\nMetadata:", metadatas)
        print("=====================\n")
        
        # 3. Build context
        context = "\n\n".join(documents)

        # 4. Generate answer
        answer = generate_answer(context, question)

        # 5. Extract sources
        sources = [
            {
                "document_id": meta["document_id"],
                "chunk_index": meta["chunk_index"]
            }
            for meta in metadatas
        ]

        return {
            "answer": answer,
            "sources": sources
        }

    except Exception as e:
        return {"error": str(e)}
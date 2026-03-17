import chromadb
from config.settings import VECTOR_DB_PATH

client = chromadb.PersistentClient(path=VECTOR_DB_PATH)

collection = client.get_or_create_collection("documents")

def store_embeddings(chunks,embeddings,document_id):
 ids=[]
 metadatas=[]

 for i in range(len(chunks)):
  ids.append(f"{document_id}_{i}")
  metadatas.append({
   "document_id":document_id,
   "chunk_index":i
  })

 collection.add(
  documents=chunks,
  embeddings=embeddings.tolist(),
  ids=ids,
  metadatas=metadatas
 )
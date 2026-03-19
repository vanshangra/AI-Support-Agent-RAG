import chromadb
from config.settings import VECTOR_DB_PATH

client = chromadb.PersistentClient(path=VECTOR_DB_PATH)

collection = client.get_or_create_collection("documents")


def retrieve_chunks(query_embedding, top_k=5, document_id=None):

    if document_id:
        results = collection.query(
            query_embeddings=[query_embedding.tolist()],
            n_results=top_k,
            where={"document_id": document_id}
        )
    else:
        results = collection.query(
            query_embeddings=[query_embedding.tolist()],
            n_results=top_k
        )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]

    return documents, metadatas
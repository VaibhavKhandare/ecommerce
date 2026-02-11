import json
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from pymilvus import Collection, connections, utility
from dotenv import load_dotenv

load_dotenv()

COLLECTION_NAME = "products"
DIM = 768
MODEL_NAME = "sentence-transformers/all-mpnet-base-v2"  # ~420 MB, better accuracy

# Exclude "a" and "an" so product terms like "a-line", "anarkali" stay intact
STOPWORDS = frozenset(
    "the this that these those is are was were be been being have has had do does did "
    "will would could should may might must shall can need to of in for on with at by from "
    "as into through during before after above below between under again further then once "
    "here there when where why how all each every both few more most other some such no nor "
    "not only own same so than too very just and but if or because until while although though "
    "like".split()
)


def get_embedding_model():
    return SentenceTransformer(MODEL_NAME)


def remove_stopwords(text: str) -> str:
    if not text:
        return ""
    words = text.lower().split()
    return " ".join(w for w in words if w not in STOPWORDS).strip()


def text_for_product(p: dict) -> str:
    parts = [
        p.get("name") or "",
        p.get("brand") or "",
        p.get("description") or "",
    ]
    raw = " ".join(x.strip() for x in parts if x).strip().lower() or "product"
    return remove_stopwords(raw) or "product"


def ensure_collection():
    if not connections.has_connection("default"):
        connections.connect(
            "default",
            uri=os.getenv("MILVUS_URI", "http://localhost:19530"),
        )
    from pymilvus import CollectionSchema, FieldSchema, DataType

    try:
        if utility.has_collection(COLLECTION_NAME):
            col = Collection(COLLECTION_NAME)
            for f in col.schema.fields:
                if f.name == "embedding" and (getattr(f, "params", None) or {}).get("dim") != DIM:
                    utility.drop_collection(COLLECTION_NAME)
                    break
            else:
                return col
    except Exception:
        pass
    fields = [
        FieldSchema(name="product_id", dtype=DataType.VARCHAR, max_length=64, is_primary=True),
        FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=DIM),
    ]
    schema = CollectionSchema(fields=fields, description="product embeddings")
    handler = connections._fetch_handler("default")
    handler.create_collection(COLLECTION_NAME, schema)
    col = Collection(COLLECTION_NAME)
    col.create_index(
        "embedding",
        {
            "index_type": "IVF_PQ",
            "metric_type": "IP",
            "params": {"nlist": 1024, "m": 12, "nbits": 8},
        },
    )
    return col


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = get_embedding_model()
    try:
        app.state.collection = ensure_collection()
    except Exception as e:
        app.state.collection = None
        print(f"Milvus not available: {e}. Index and search will fail until Milvus is running.")
    yield


app = FastAPI(lifespan=lifespan)


class IndexBody(BaseModel):
    products: list[dict]


@app.post("/connect")
def connect_milvus():
    """Connect to Milvus (or reconnect). Call after Milvus becomes available."""
    try:
        app.state.collection = ensure_collection()
        return {"status": "connected"}
    except Exception as e:
        app.state.collection = None
        raise HTTPException(status_code=503, detail=str(e))


@app.post("/recreate-index")
def recreate_index():
    """Drop and recreate the collection (new index params). Call before reindexing."""
    try:
        if utility.has_collection(COLLECTION_NAME):
            utility.drop_collection(COLLECTION_NAME)
        app.state.collection = ensure_collection()
        return {"status": "recreated"}
    except Exception as e:
        app.state.collection = None
        raise HTTPException(status_code=503, detail=str(e))


@app.get("/health")
def health():
    """Check if Milvus is connected."""
    return {"milvus": "connected" if app.state.collection is not None else "disconnected"}


@app.post("/index")
def index_products(body: IndexBody):
    col = app.state.collection
    if col is None:
        raise HTTPException(status_code=503, detail="Milvus not connected")
    if not body.products:
        return {"indexed": 0}
    texts = [text_for_product(p) for p in body.products]
    ids = []
    for p in body.products:
        pid = p.get("id") or p.get("_id")
        ids.append(str(pid) if pid is not None else "")
    if not all(ids):
        raise HTTPException(status_code=400, detail="Each product must have 'id' or '_id'")
    embeddings = app.state.model.encode(texts).tolist()
    col.load()
    try:
        col.delete(expr="product_id in " + json.dumps(ids))
    except Exception:
        pass
    col.insert([ids, embeddings])
    col.flush()
    return {"indexed": len(ids)}


class DeleteBody(BaseModel):
    productIds: list[str]


@app.post("/delete")
def delete_from_index(body: DeleteBody):
    """Remove product ids from the vector index."""
    col = app.state.collection
    if col is None:
        raise HTTPException(status_code=503, detail="Milvus not connected")
    if not body.productIds:
        return {"deleted": 0}
    ids = [str(pid) for pid in body.productIds]
    col.load()
    try:
        col.delete(expr="product_id in " + json.dumps(ids))
        col.flush()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"deleted": len(ids)}


@app.get("/search")
def search(q: str, limit: int = 20):
    col = app.state.collection
    if col is None:
        raise HTTPException(status_code=503, detail="Milvus not connected")
    if not q or not q.strip():
        return {"results": []}
    query = remove_stopwords(q.strip().lower()) or q.strip().lower()
    limit = min(max(1, int(limit)), 200)
    vec = app.state.model.encode([query]).tolist()
    col.load()
    results = col.search(
        data=vec,
        anns_field="embedding",
        param={"metric_type": "IP", "params": {"nprobe": 64}},
        limit=limit,
        output_fields=["product_id"],
    )
    out = []
    for hits in results:
        for h in hits:
            out.append({"productId": h.entity.get("product_id"), "score": float(h.score)})
    return {"results": out}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)

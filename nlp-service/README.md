# NLP Search Microservice

Embeddings + Milvus for semantic product search. **Port:** 8000 (set `PORT` in `.env` to change).

**Requires:** Python 3.10+, Milvus 2.x (see backend README for Docker command).

```bash
cp .env.example .env   # MILVUS_URI (default http://localhost:19530), PORT (default 8000)
pip install -r requirements.txt
python app.py          # uses PORT from .env; or: uvicorn app:app --reload --port 8000
```

- **POST /index** — body: `{ "products": [ { "id": "...", "name", "brand", "description" } ] }`. Indexes product embeddings into Milvus.
- **GET /search?q=...&limit=20** — returns `{ "results": [ { "productId", "score" } ] }`.

Backend calls this for `GET /search/semantic?q=...` and `POST /search/reindex` (syncs all MongoDB products into Milvus).

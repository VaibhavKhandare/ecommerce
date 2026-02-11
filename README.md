# E-commerce Backend

Node API + React client + Python NLP service (semantic search) + Milvus. One repo, one git.

## Ports

| Service        | Default port | Env / note                    |
|----------------|-------------:|-------------------------------|
| React client   | 3000         | `npm start`                   |
| Node API       | 4000         | `PORT` in `config.env`        |
| NLP service    | 8000         | `PORT` in `nlp-service/.env`  |
| Milvus         | 19530        | `MILVUS_URI` in nlp-service   |

## 1. Backend (Node)

- Create `config.env` in backend root with at least:
  - `DATABASE` – MongoDB connection string
  - `STRIPE_PRIVATE_KEY` – Stripe secret key
  - `SERVER_URL` – e.g. `http://localhost:4000`
  - Optional: `PORT` (default 4000), `NLP_SERVICE_URL` (default `http://localhost:8000`)
- From backend root:
  ```bash
  npm install
  npm start
  ```
- API: **http://localhost:4000**

## 2. Client (React)

- From `client/`:
  ```bash
  npm install
  npm start
  ```
- App: **http://localhost:3000**

## 3. NLP service (Python)

- **Requires:** Python 3.10+, Milvus running (see below).
- From `nlp-service/`:
  ```bash
  cp .env.example .env
  # Edit .env: MILVUS_URI (default http://localhost:19530), PORT (default 8000)
  python -m venv venv
  source venv/bin/activate   # Windows: venv\Scripts\activate
  pip install -r requirements.txt
  python app.py
  ```
- Service: **http://localhost:8000** (or whatever `PORT` in `.env`).  
- Endpoints: `GET /health`, `GET /search?q=...`, `POST /index`, etc.

## 4. Milvus (vector DB for semantic search)

- With Docker (persist data in `nlp-service/milvus/volumes/milvus`):
  ```bash
  docker run -d -p 19530:19530 \
    -v "$(pwd)/nlp-service/milvus/volumes/milvus:/var/lib/milvus" \
    milvusdb/milvus:latest
  ```
- Milvus: **localhost:19530** (gRPC). NLP service connects via `MILVUS_URI` in `.env`.

## Run order

1. Start Milvus (Docker).
2. Start NLP service (`cd nlp-service`, venv, `python app.py`).
3. Start Node backend (`npm start` from backend root).
4. Start client (`cd client && npm start`).

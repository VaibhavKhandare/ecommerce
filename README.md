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
- **Frontend-only (no backend):** Set `REACT_APP_USE_DUMMY=true` before build. The app will use built-in dummy data (slider, categories, 6 products). Set `REACT_APP_API_URL` to your API URL when using a backend.

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

- No persistence needed; index is rebuilt when you reindex (e.g. `POST /search/reindex` from the API). Run with Docker:
  ```bash
  docker run -d -p 19530:19530 milvusdb/milvus:latest
  ```
- Milvus: **localhost:19530**. NLP service connects via `MILVUS_URI` in `.env`. After backend is up, call reindex once to fill the index.

## Run order

1. Start Milvus: `docker run -d -p 19530:19530 milvusdb/milvus:latest`
2. Start NLP service (`cd nlp-service`, venv, `python app.py`).
3. Start Node backend (`npm start` from backend root).
4. Reindex once (e.g. `POST http://localhost:4000/search/reindex` or use your app’s reindex flow).
5. Start client (`cd client && npm start`).

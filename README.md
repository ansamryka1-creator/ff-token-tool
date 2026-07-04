# FF Token Tool 🎮

A professional and modern web platform for Free Fire players with specialized tools for generating tokens, creating bios, and accessing pre-made bio libraries.

## 🚀 Features

- **JWT/EAT Generator**: Generate access tokens from multiple platforms (Google, Facebook, VK, Huawei, Apple)
- **Long Bio Editor**: Create and style bios with formatting options
- **Bio Library**: Access pre-made bio templates
- **Modern Cyberpunk/Gamer Design**: Dark theme with neon glow effects
- **Mobile First**: 100% responsive design
- **Fast Performance**: Optimized for speed

## 🛠 Tech Stack

### Frontend
- Next.js 14+
- TypeScript
- Tailwind CSS
- Framer Motion (animations)

### Backend
- FastAPI (Python)
- Uvicorn
- Python 3.9+
- Deployed as Vercel Python serverless functions (`frontend/api/`)

## 📦 Project Structure

The FastAPI backend lives inside the Next.js project as Vercel Python
serverless functions, so the whole app deploys as a **single Vercel project**
(one domain, no CORS).

```
ff-token-tool/
├── frontend/                 # Next.js application (Vercel project root)
│   ├── api/                  # FastAPI backend (Vercel Python functions)
│   │   ├── index.py          # Serverless entrypoint (exposes `app`)
│   │   ├── requirements.txt  # Python dependencies
│   │   └── _core/            # FastAPI app, routes and services
│   └── vercel.json           # Routes /api/* to the Python function
└── docker-compose.yml        # Local/VPS Docker configuration
```

## 🚀 Getting Started (local)

Run the backend and frontend in two terminals. The Next.js dev server
automatically proxies `/api/*` to the backend on port 8000.

### Backend

```bash
cd frontend/api
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn index:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 — the tools call the API on the same origin.

## 📝 API Endpoints

- `POST /api/token` — extract a JWT from an Access Token
- `POST /api/eat-to-access` — convert an EAT token/URL to an Access Token
- `POST /api/guest-token` — get an Access Token from a guest account (UID + password)
- `POST /api/update-bio` — update the account bio using a JWT
- `GET /api/library` — get the bio library

## 📖 Documentation

See individual README files in frontend and backend directories.

## 📄 License

MIT License
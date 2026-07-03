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

## 📦 Project Structure

```
ff-token-tool/
├── frontend/                 # Next.js application
├── backend/                  # FastAPI application
└── docker-compose.yml        # Docker configuration
```

## 🚀 Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 📝 API Endpoints

- `POST /api/token` - Generate JWT/EAT tokens
- `POST /api/longbio` - Process bio content
- `GET /api/bios` - Get bio library

## 📖 Documentation

See individual README files in frontend and backend directories.

## 📄 License

MIT License
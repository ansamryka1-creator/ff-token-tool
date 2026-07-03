# FF Token Tool - Backend API

FastAPI-based backend for FF Token Tool platform.

## 🚀 Quick Start

### Installation

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Server

```bash
uvicorn app.main:app --reload
```

Server will be available at `http://localhost:8000`

## 📚 API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📋 Endpoints

### POST /api/token
Generate JWT/EAT tokens

### POST /api/longbio
Process bio content

### GET /api/bios
Get bio library

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   └── routes/
│       ├── token.py
│       └── bio.py
├── requirements.txt
└── README.md
```
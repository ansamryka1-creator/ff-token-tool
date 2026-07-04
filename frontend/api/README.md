# FF Token Tool - Backend README

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- pip

### Installation

```bash
cd backend
python -m venv venv

# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

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

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py             # FastAPI app setup
│   ├── models.py           # Pydantic models
│   └── routes/
│       ├── __init__.py
│       ├── token.py        # Token generation routes
│       └── bio.py          # Bio processing routes
├── requirements.txt        # Python dependencies
├── Dockerfile
└── README.md
```

## 🔌 API Endpoints

### POST /api/token
Generate JWT/EAT tokens

**Request:**
```json
{
  "platform": "google",
  "url": "https://example.com/account"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "uid": "FF_1234567890",
  "expiration": "2024-07-04T21:45:11Z"
}
```

### POST /api/longbio
Process bio content

**Request:**
```json
{
  "content": "Your bio text here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Bio processed successfully",
  "content": "Your bio text here",
  "length": 20
}
```

### GET /api/bios
Get bio library

**Response:**
```json
[
  {
    "id": 1,
    "text": "★ FALLEN ★ | FF Player | 💀",
    "category": "Gaming"
  }
]
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
ENVIRONMENT=development
API_HOST=0.0.0.0
API_PORT=8000
API_DEBUG=True
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

## 🚢 Deployment

### Docker

```bash
docker build -t ff-token-tool-backend .
docker run -p 8000:8000 ff-token-tool-backend
```

### Railway / Render / Heroku

Set `ENVIRONMENT=production` and deploy.

## 📦 Dependencies

- **FastAPI**: Modern web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **python-multipart**: File upload support
- **python-dotenv**: Environment variables

## 🔐 Security

- CORS enabled for all origins (configure for production)
- Input validation with Pydantic
- Error handling and logging
- Rate limiting recommended for production

## 📚 Learn More

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Uvicorn Documentation](https://www.uvicorn.org)
- [Pydantic Documentation](https://docs.pydantic.dev)

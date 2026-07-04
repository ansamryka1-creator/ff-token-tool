# FF Token Tool - Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel — single project (Recommended)

The Next.js frontend and the FastAPI backend deploy together as **one Vercel
project**. The frontend is served at `/` and the FastAPI app runs as a Python
serverless function serving `/api/*` on the same domain (no CORS, no second host).

1. Push the repository to GitHub.
2. In Vercel, **Import Project** and, in the project settings, set the
   **Root Directory** to `frontend`. This is the most important step — Vercel
   must build from `frontend/`, where `package.json`, `api/` and `vercel.json` live.
3. Leave `NEXT_PUBLIC_API_URL` **unset/empty** (the API is same-origin).
4. Deploy. Vercel auto-detects Next.js from `package.json` and the Python
   function from `api/index.py` (dependencies from `api/requirements.txt`).

After deploying, verify:
- `https://<your-app>.vercel.app/` — the site loads
- `https://<your-app>.vercel.app/api/health` — returns `{"status":"ok",...}`
- `https://<your-app>.vercel.app/api/library` — returns the bio list

> How it works: `frontend/vercel.json` rewrites `/api/(.*)` to the
> `api/index.py` function, which exposes the FastAPI `app` (all routes are
> prefixed with `/api`). The `_core/` package holds the app code and is ignored
> as a function entrypoint because of its leading underscore.

---

### Option 2: Docker Compose (Local/VPS)

```bash
# Clone the repository
git clone https://github.com/ansamryka1-creator/ff-token-tool.git
cd ff-token-tool

# Build and run (frontend proxies /api/* to the backend over the Docker network)
docker-compose up --build
```

Access:
- App: http://localhost:3000 (API available at http://localhost:3000/api)
- Backend (direct): http://localhost:8000

---

### Option 3: Vercel (frontend) + separate backend host

If you prefer to run the backend elsewhere (Railway/Render/Fly.io):

#### Frontend on Vercel

1. Import the repo, set **Root Directory** to `frontend`.
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```
3. Deploy.

#### Backend on Railway/Render

1. Connect the GitHub repository.
2. Set the root/build directory to `frontend/api`.
3. Start command: `uvicorn index:app --host 0.0.0.0 --port $PORT`
4. Deploy.

---

### Option 4: Heroku (Free tier ended, use alternatives)

Alternatives:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Fly.io**: https://fly.io

---

### Option 5: VPS (DigitalOcean, Linode, Vultr)

#### Prerequisites
- Ubuntu 22.04 LTS
- SSH access

#### Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Clone repository
git clone https://github.com/ansamryka1-creator/ff-token-tool.git
cd ff-token-tool

# Start services
sudo docker-compose up -d
```

#### Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Create config
sudo nano /etc/nginx/sites-available/default
```

```nginx
upstream frontend {
    server localhost:3000;
}

upstream backend {
    server localhost:8000;
}

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

```bash
# Enable and restart Nginx
sudo systemctl enable nginx
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 📊 Production Checklist

- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] API rate limiting enabled
- [ ] Error logging configured
- [ ] SSL/TLS certificate installed
- [ ] Database backups scheduled
- [ ] Monitoring and alerts setup
- [ ] Documentation updated

---

## 🔒 Security Recommendations

1. **Use HTTPS only**
2. **Set strong environment variables**
3. **Enable CORS only for your domain**
4. **Use API rate limiting**
5. **Regular security updates**
6. **Monitor logs for suspicious activity**
7. **Keep dependencies updated**

---

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :8000

# Kill process
sudo kill -9 <PID>
```

### Container Issues

```bash
# View logs
docker-compose logs -f

# Rebuild
docker-compose down
docker-compose up --build
```

### Database Connection Failed

- Check `.env` configuration
- Verify network connectivity
- Review logs for errors

---

## 📞 Support

For issues:
1. Check documentation
2. Review logs
3. Open GitHub issue
4. Contact owner

# FF Token Tool - Deployment Guide

## 🚀 Deployment Options

### Option 1: Docker Compose (Recommended for Local/VPS)

```bash
# Clone the repository
git clone https://github.com/ansamryka1-creator/ff-token-tool.git
cd ff-token-tool

# Configure environment
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Edit .env files with your settings
# nano backend/.env

# Build and run
docker-compose up --build
```

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

---

### Option 2: Vercel + Railway

#### Frontend on Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```
4. Deploy

#### Backend on Railway

1. Connect GitHub repository
2. Select `backend` folder as root directory
3. Add environment variables
4. Deploy

---

### Option 3: Heroku (Free tier ended, use alternatives)

Alternatives:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Fly.io**: https://fly.io

---

### Option 4: VPS (DigitalOcean, Linode, Vultr)

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

# Setup environment files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Edit configuration
sudo nano backend/.env

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

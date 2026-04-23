# Deployment Guide: Railway (Django) + Vercel (Next.js)

## Overview
- **Django Backend**: Deployed on Railway with PostgreSQL
- **Next.js Frontend**: Deployed on Vercel
- **Environment Variables**: Configured for production

## Step 1: Deploy Django Backend on Railway

### 1.1 Create Railway Account
- Go to [railway.app](https://railway.app)
- Create an account or sign in

### 1.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your task-manager repository
4. Railway will detect the configuration from `railway.json`

### 1.3 Configure PostgreSQL Database
1. In your Railway project, click "New Service"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically set `DATABASE_URL` environment variable

### 1.4 Set Environment Variables
Go to your Django service → "Variables" tab and add:

```bash
SECRET_KEY=your-production-secret-key-here
DEBUG=False
ALLOWED_HOSTS=.railway.app,.vercel.app,localhost,127.0.0.1
CORS_ALLOW_ALL_ORIGINS=False
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### 1.5 Run Migrations
1. Go to "Deployments" tab
2. Click on your deployment
3. Click "Exec" button to open console
4. Run: `python manage.py migrate`
5. Run: `python manage.py createsuperuser` (optional)

### 1.6 Get Your Backend URL
- Go to "Networking" tab
- Copy your Railway URL (e.g., `https://task-manager.up.railway.app`)

## Step 2: Deploy Next.js Frontend on Vercel

### 2.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Create an account or sign in

### 2.2 Import Project
1. Click "Add New Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### 2.3 Set Environment Variables
In Vercel project settings → "Environment Variables":

```bash
NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app
```

### 2.4 Deploy
- Click "Deploy"
- Vercel will build and deploy your Next.js app
- Get your frontend URL (e.g., `https://task-manager.vercel.app`)

## Step 3: Update CORS Settings

### 3.1 Update Railway Django Service
Go back to Railway → Django service → "Variables":

```bash
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### 3.2 Update Vercel Frontend
Go to Vercel → project → "Environment Variables":

```bash
NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app
```

## Step 4: Verify Deployment

### 4.1 Test Backend
- Visit: `https://your-railway-app.railway.app/admin/`
- You should see Django admin login page

### 4.2 Test Frontend
- Visit: `https://your-frontend.vercel.app`
- Check browser console for API connection errors

### 4.3 Test API Connection
- Open browser DevTools
- Make a test API call from frontend
- Verify CORS is working correctly

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure `CORS_ALLOWED_ORIGINS` includes your Vercel domain
- Check that `CORS_ALLOW_ALL_ORIGINS=False` in production

**2. Database Connection**
- Verify Railway PostgreSQL service is running
- Check `DATABASE_URL` is set in Django service
- Run migrations: `python manage.py migrate`

**3. Static Files Not Loading**
- Ensure Whitenoise is installed
- Run: `python manage.py collectstatic --noinput`

**4. Build Failures**
- Check Dockerfile has correct Python version
- Verify all dependencies are in requirements.txt
- Check Railway build logs for specific errors

## Environment Variables Reference

### Railway (Django)
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| SECRET_KEY | Yes | - | Django secret key |
| DEBUG | No | False | Debug mode |
| ALLOWED_HOSTS | Yes | localhost | Allowed hosts |
| DATABASE_URL | Auto | - | PostgreSQL connection |
| CORS_ALLOW_ALL_ORIGINS | Yes | True | Allow all CORS origins |
| CORS_ALLOWED_ORIGINS | No | - | Specific allowed origins |

### Vercel (Next.js)
| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| NEXT_PUBLIC_API_URL | Yes | http://localhost:8000 | Django backend URL |

## File Structure

```
task-manager/
├── server/
│   ├── Dockerfile           # Railway deployment config
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example        # Environment variables template
│   └── taskmanager/
│       └── settings.py     # Django settings (updated for production)
├── client/
│   ├── next.config.ts      # Next.js config (updated)
│   ├── .env.example        # Environment variables template
│   └── Dockerfile          # Not used (Vercel uses their build system)
├── railway.json            # Railway deployment config
└── DEPLOYMENT.md          # This file
```

## Post-Deployment

1. **Set up custom domains** (optional)
   - Railway: Networking → Custom Domains
   - Vercel: Settings → Domains

2. **Enable monitoring**
   - Railway: Metrics tab for performance
   - Vercel: Analytics tab for usage

3. **Set up backups**
   - Railway automatically backs up PostgreSQL
   - Consider export/snapshot policies

4. **Security hardening**
   - Generate strong SECRET_KEY
   - Enable HTTPS (automatic on both platforms)
   - Review ALLOWED_HOSTS regularly
   - Consider rate limiting for API
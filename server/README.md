# Task Manager Server - Vercel Deployment

This Django REST API server is configured to run on Vercel Serverless Functions.

## Local Development

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Run development server:
```bash
python manage.py runserver
```

## Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Set environment variables in Vercel:
```bash
vercel env add DATABASE_URL
vercel env add SECRET_KEY
vercel env add DEBUG
```

3. Deploy:
```bash
vercel
```

### Environment Variables Required:
- `DATABASE_URL`: PostgreSQL connection string (e.g., from Neon, Railway, or Supabase)
- `SECRET_KEY`: Django secret key for cryptographic signing
- `DEBUG`: Set to "False" for production

## API Endpoints

Once deployed, your API will be available at:
- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create a new task
- `GET /api/tasks/{id}/` - Get specific task
- `PUT /api/tasks/{id}/` - Update task
- `DELETE /api/tasks/{id}/` - Delete task

## Database Setup with Neon (Recommended)

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Set it as `DATABASE_URL` in Vercel environment variables

## CORS Configuration

The server is configured to allow all origins (`CORS_ALLOW_ALL_ORIGINS = True`). For production, you should restrict this to your specific frontend domain:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
    "http://localhost:3000",
]
```
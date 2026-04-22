# Professional Task Manager 🚀

A sophisticated, full-stack task management application combining the power of Next.js for a modern, responsive frontend and Django REST Framework for a robust backend. This application features a professional corporate UI design, real-time task management, intelligent due date tracking, and comprehensive filtering capabilities.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15+-black.svg)
![Django](https://img.shields.io/badge/Django-5.0+-green.svg)

---

## 🌟 Features Overview

### Core Functionality

#### **Task Management**
- **Complete CRUD Operations**: Create, read, update, and delete tasks with a seamless user experience
- **Kanban-style Board**: Visual task organization with three customizable columns:
  - 🔵 **To Do** - Tasks waiting to be started
  - 🟡 **In Progress** - Tasks currently being worked on
  - 🟢 **Completed** - Finished tasks
- **Priority System**: Three-level priority hierarchy with visual indicators:
  - 🔴 **High Priority** - Urgent tasks requiring immediate attention
  - 🟡 **Medium Priority** - Standard tasks with normal importance
  - 🟢 **Low Priority** - Tasks that can be deferred

#### **Intelligent Due Date Tracking**
- **Flexible Due Dates**: Optional due date field for time-sensitive tasks
- **Urgency-Based Color Coding**: Automated visual indicators based on deadline proximity:
  - 🔴 **Overdue** - Past due date (bold red text)
  - 🟠 **Due Today** - Deadline is today (orange text)
  - 🟡 **Due Soon** - Within 2 days (amber text)
  - 🟢 **On Track** - More than 2 days away (green text)

#### **Advanced Search & Filtering**
- **Real-time Search**: Instant filtering as you type across task titles and descriptions
- **Multi-Criteria Sorting**: Organize tasks by:
  - 📅 **Latest** - Most recently created/updated tasks first
  - ⏰ **Due Date** - Tasks sorted by deadline
  - ⚡ **Priority** - High to low priority ordering
- **Persistent State**: Search and sort preferences maintained during session

#### **Comprehensive Task Information**
- **Timestamp Tracking**: Automatic tracking of:
  - 🕐 **Created Date** - When the task was originally created
  - 🔄 **Updated Date** - Last modification timestamp
- **Rich Task Details**: Support for detailed descriptions and metadata
- **Visual Badges**: Quick-reference indicators for status and priority

### User Interface Excellence

#### **Professional Corporate Design**
- **Clean Aesthetic**: Modern, business-appropriate visual design
- **Consistent Color Palette**: Professional blue gradients and semantic coloring
- **Typography Excellence**: System fonts with optimal readability
- **Visual Hierarchy**: Clear information architecture for easy scanning

#### **Responsive Layout**
- **Desktop Experience**: Full three-column layout with all features
- **Tablet Optimization**: Two-column layout for medium screens
- **Mobile Friendly**: Single-column stacked layout for small screens
- **Touch-Optimized**: Larger tap targets and mobile-appropriate spacing

#### **Interactive Elements**
- **Hover Effects**: Subtle card animations and shadow transitions
- **Smooth Transitions**: 60fps animations throughout the interface
- **Modal Design**: Professional forms with gradient headers and backdrop blur
- **Form Validation**: Real-time validation with inline error messages
- **Loading States**: Professional loading indicators for async operations

#### **Accessibility Features**
- **WCAG Compliance**: High contrast ratios for better readability
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus States**: Clear visual indicators for focused elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

---

## 🛠️ Technology Stack

### Frontend Architecture
```
Next.js 15+ (React 19)
├── TypeScript for type safety
├── Tailwind CSS for styling
├── React Hooks for state management
└── Fetch API for backend communication
```

**Key Frontend Technologies:**
- **Next.js 15+**: Latest React framework with server components and app directory
- **TypeScript**: Static typing and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Hooks**: useState, useEffect for state and lifecycle management
- **Fetch API**: Native browser API for HTTP requests

### Backend Architecture
```
Django 5.0+ REST Framework
├── Django ORM for database operations
├── REST Framework for API endpoints
└── SQLite (configurable for PostgreSQL/MySQL)
```

**Key Backend Technologies:**
- **Django 5.0+**: Modern Python web framework
- **Django REST Framework**: Powerful toolkit for building Web APIs
- **Django ORM**: Abstract database interface with support for multiple databases
- **Serialization**: Built-in serializers for data validation and transformation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** and npm (comes with Node.js)
- **Python 3.9+** with pip
- **Git** for version control

**Verify installations:**
```bash
node --version    # Should be v18.0.0 or higher
python --version  # Should be 3.9.0 or higher
git --version     # Should show git version
```

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Backend Setup (Django)

#### **Create and Activate Virtual Environment**
```bash
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

#### **Install Dependencies and Setup Database**
```bash
# Install required Python packages
pip install django djangorestframework

# Run database migrations
python manage.py migrate

# (Optional) Create a superuser for admin access
python manage.py createsuperuser
```

#### **Start Backend Server**
```bash
python manage.py runserver
```

The backend API will be available at: `http://127.0.0.1:8000`

### 3. Frontend Setup (Next.js)

#### **Install Dependencies**
```bash
cd client

# Install npm packages
npm install
```

#### **Start Development Server**
```bash
npm run dev
```

The frontend application will be available at: `http://localhost:3000`

---

## 🏗️ Project Structure

```
task-manager/
├── client/                          # Next.js Frontend Application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── app/                     # Next.js App Directory
│   │   │   ├── globals.css          # Global CSS styles and animations
│   │   │   ├── layout.tsx           # Root layout component
│   │   │   └── page.tsx             # Main page (Task Board)
│   │   ├── components/              # React Components
│   │   │   └── TaskFormModel.tsx    # Task creation/editing modal
│   │   ├── lib/                     # Utility Functions
│   │   │   └── api.ts               # API client functions
│   │   └── types/                   # TypeScript Type Definitions
│   │       └── task.ts              # Task interfaces and types
│   ├── package.json                 # npm dependencies and scripts
│   ├── tailwind.config.ts           # Tailwind CSS configuration
│   └── tsconfig.json                # TypeScript configuration
│
├── server/                          # Django Backend Application
│   ├── taskmanager/                 # Django Project Settings
│   │   ├── settings.py              # Project configuration
│   │   ├── urls.py                  # URL routing
│   │   └── wsgi.py                  # WSGI configuration
│   ├── tasks/                       # Tasks App
│   │   ├── migrations/              # Database migrations
│   │   │   ├── 0001_initial.py      # Initial Task model
│   │   │   └── 0002_task_due_date.py # Due date field addition
│   │   ├── models.py                # Task data model
│   │   ├── serializers.py           # API serialization
│   │   └── views.py                 # API viewsets
│   ├── manage.py                    # Django management script
│   └── requirements.txt             # Python dependencies
│
└── README.md                        # This file
```

---

## 🔌 API Documentation

### Base URL
```
http://127.0.0.1:8000/api
```

### Endpoints

#### **Get All Tasks**
```http
GET /api/tasks/
```
**Response:** Array of all task objects

#### **Create New Task**
```http
POST /api/tasks/
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-04-30"
}
```
**Response:** Created task object with generated ID

#### **Get Specific Task**
```http
GET /api/tasks/{id}/
```
**Response:** Single task object

#### **Update Task**
```http
PATCH /api/tasks/{id}/
Content-Type: application/json

{
  "status": "doing",
  "priority": "medium"
}
```
**Response:** Updated task object

#### **Delete Task**
```http
DELETE /api/tasks/{id}/
```
**Response:** 204 No Content

### Task Data Model

```typescript
interface Task {
  id: string;                    // Unique identifier
  title: string;                 // Task title (required)
  description: string;           // Detailed description
  status: 'todo' | 'doing' | 'done';  // Current status
  priority: 'low' | 'medium' | 'high'; // Priority level
  due_date: string | null;       // ISO date string or null
  created_at: string;            // ISO datetime string
  updated_at: string;            // ISO datetime string
}
```

---

## 🎨 Design System

### Color Palette

#### **Primary Colors**
- **Primary Blue**: Gradient from `blue-600` to `blue-700`
- **Secondary Blue**: `blue-50` for backgrounds
- **Border Blue**: `blue-300` for borders and outlines

#### **Status Colors**
- **To Do**: Blue theme (`bg-blue-50`, `text-blue-700`, `border-blue-300`)
- **In Progress**: Amber theme (`bg-amber-50`, `text-amber-700`, `border-amber-300`)
- **Completed**: Emerald theme (`bg-emerald-50`, `text-emerald-700`, `border-emerald-300`)

#### **Priority Colors**
- **High Priority**: Red theme (`bg-red-100`, `text-red-700`, `border-red-300`)
- **Medium Priority**: Amber theme (`bg-amber-100`, `text-amber-700`, `border-amber-300`)
- **Low Priority**: Green theme (`bg-green-100`, `text-green-700`, `border-green-300`)

#### **Due Date Status Colors**
- **Overdue**: `text-red-700` (bold)
- **Due Today**: `text-orange-700`
- **Due Soon**: `text-amber-700`
- **On Track**: `text-green-700`

### Typography

#### **Font Stack**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
             'Helvetica Neue', sans-serif;
```

#### **Type Scale**
- **Headings**: Bold weight (`font-bold`), slate-800 color
- **Subheadings**: Semibold weight (`font-semibold`), slate-700 color
- **Body Text**: Regular weight, slate-700 color
- **Secondary Text**: Regular weight, slate-600 color
- **Labels**: Semibold weight, slate-700 color

### Spacing & Layout

#### **Container Widths**
- **Main Container**: `max-w-7xl` (1280px)
- **Modal**: `max-w-lg` (512px)
- **Search Bar**: `max-w-md` (448px)

#### **Gap System**
- **Large gaps**: `space-y-5`, `gap-4` (1.25rem)
- **Medium gaps**: `space-y-3`, `gap-2` (0.75rem)
- **Small gaps**: `space-x-1` (0.25rem)

---

## 🔧 Configuration

### API Configuration

Edit `client/src/lib/api.ts` to configure the backend URL:

```typescript
const API_BASE = 'http://127.0.0.1:8000/api';
```

For production:
```typescript
const API_BASE = 'https://your-api-domain.com/api';
```

### Database Configuration

#### **SQLite (Default)**
No configuration needed - works out of the box.

#### **PostgreSQL**
Edit `server/taskmanager/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'task_manager_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_secure_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

#### **MySQL**
Edit `server/taskmanager/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'task_manager_db',
        'USER': 'your_db_user',
        'PASSWORD': 'your_secure_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

Install MySQL adapter:
```bash
pip install mysqlclient
```

---

## 🧪 Development Guide

### Running Tests

#### **Backend Tests**
```bash
cd server
python manage.py test tasks
```

#### **Frontend Tests**
```bash
cd client
npm test
```

### Creating Database Migrations

```bash
cd server

# Create migration files after model changes
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate

# Show migration SQL without executing
python manage.py sqlmigrate tasks 0001
```

### Django Management Commands

```bash
# Create superuser for admin access
python manage.py createsuperuser

# Open Django shell for debugging
python manage.py shell

# Collect static files for production
python manage.py collectstatic

# Check for project issues
python manage.py check
```

### NPM Scripts

```bash
cd client

# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 📦 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure root directory as `client`
   - Add environment variable for API URL
   - Click "Deploy"

### Backend Deployment (Heroku)

1. **Prepare Django for Production**
   ```bash
   cd server
   pip install gunicorn whitenoise
   pip freeze > requirements.txt
   ```

2. **Create Procfile**
   ```text
   web: gunicorn taskmanager.wsgi:application
   ```

3. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   heroku config:set DJANGO_SETTINGS_MODULE=taskmanager.settings
   git push heroku master
   heroku run python manage.py migrate
   ```

### Docker Deployment

#### **Dockerfile (Backend)**
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "taskmanager.wsgi:application"]
```

#### **Dockerfile (Frontend)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

#### **Docker Compose**
```yaml
version: '3.8'
services:
  backend:
    build: ./server
    ports:
      - "8000:8000"
  frontend:
    build: ./client
    ports:
      - "3000:3000"
    environment:
      - API_URL=http://backend:8000
```

---

## 🤝 Contributing Guidelines

We welcome contributions! Please follow these guidelines:

### **Code Style**

#### **Frontend (TypeScript/React)**
- Use functional components with hooks
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Keep components small and focused

#### **Backend (Python/Django)**
- Follow PEP 8 style guide
- Use Django conventions
- Write descriptive docstrings
- Keep functions focused and testable

### **Contribution Workflow**

1. **Fork the repository**
   ```bash
   # Fork on GitHub and clone your fork
   git clone https://github.com/your-username/task-manager.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Add tests for new functionality
   - Update documentation as needed

4. **Commit your changes**
   ```bash
   git commit -m "Add: Brief description of changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference related issues
   - Ensure all tests pass

### **Commit Message Format**

```
Add: New features
Fix: Bug fixes
Update: Changes to existing functionality
Refactor: Code restructuring
Docs: Documentation changes
Style: Formatting changes
Test: Adding or updating tests
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

```
MIT License

Copyright (c) 2026 Task Manager

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Authors & Contributors

- **[Your Name]** - *Initial Development* - [GitHub Profile](https://github.com/your-username)

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Django Community** - For the robust web framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Django REST Framework** - For the powerful toolkit for building Web APIs

---

## 📞 Support & Contact

- **Documentation**: [Full Documentation Link](#)
- **Issue Tracker**: [GitHub Issues](https://github.com/your-username/task-manager/issues)
- **Email**: support@example.com
- **Discord**: [Join our community](#)

---

## 🔮 Roadmap

### Version 1.1 (Planned)
- [ ] User authentication and authorization
- [ ] Task comments and collaboration
- [ ] File attachments for tasks
- [ ] Email notifications
- [ ] Dark mode support

### Version 2.0 (Future)
- [ ] Mobile app (React Native)
- [ ] Real-time updates (WebSockets)
- [ ] Advanced analytics dashboard
- [ ] Team workspaces
- [ ] Calendar integration

---

**Built with ❤️ using Next.js and Django**

*Last Updated: April 2026*

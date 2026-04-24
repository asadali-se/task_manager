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


## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Django Community** - For the robust web framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Django REST Framework** - For the powerful toolkit for building Web APIs

---

## 📞 Support & Contact

- **Documentation**: [Full Documentation Link](#)
- **Issue Tracker**: [GitHub Issues](https://github.com/asadali-se/task-manager/issues)
- **Email**: asadcodemaster@gmail.com

---


**Built with ❤️ using Next.js and Django**

*Last Updated: April 2026*

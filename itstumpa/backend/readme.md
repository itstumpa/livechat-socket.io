# LiveChat

A real-time chat platform with file sharing and admin moderation built with Node.js, Express, Socket.IO, and Prisma.

## Live frontend: https://livechat-jade.vercel.app


## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Socket.IO Events](#socketio-events)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Running the Application](#running-the-application)
- [License](#license)

## ✨ Features

### Authentication & Authorization
- User registration with email verification
- JWT-based authentication
- Role-based access control (USER, ADMIN, SUPER_ADMIN)
- Password reset functionality

### Real-Time Chat
- One-to-one direct messaging
- Real-time message delivery using Socket.IO
- Message status tracking (Sent, Delivered, Read)
- Typing indicators
- Online/offline user status
- Last seen timestamp

### File Sharing
- Image uploads (JPEG, PNG, GIF, WebP) - Max 5MB
- Document uploads (PDF, DOCX, TXT) - Max 10MB
- Cloudinary integration for cloud storage

### User Management
- Search users by name or email
- User profile management
- Conversation list with last message preview
- Message history with cursor-based pagination

### Admin Features (SUPER_ADMIN only)
- User management (list, search, suspend/unsuspend)
- Platform statistics dashboard
- Conversation moderation (view metadata, delete conversations)
- User suspension with reason tracking

## 🛠 Tech Stack

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Real-time:** Socket.IO
- **Authentication:** JWT (Passport.js)
- **File Upload:** Multer + Cloudinary
- **Validation:** Zod

## 📦 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Cloudinary account

## 🚀 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/livechat.git
   cd livechat
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
```env
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/livechat"
   
   # JWT
   JWT_SECRET="your-secret-key"
   JWT_EXPIRES_IN="7d"
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Client
   CLIENT_URL="http://localhost:3000"
```

4. **Set up database**
```bash
   npx prisma migrate dev
   npx prisma generate
```

5. **Seed admin user (optional)**
```bash
   npm run seed
```

## 📁 Project Structure

```
src/
├── app/
│   ├── config/
│   │   └── cloudinary.ts
│   ├── helpers/
│   │   └── paginationHelper.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── socket.ts
│   ├── middlewares/
│   │   ├── adminAuth.ts
│   │   ├── auth.ts
│   │   ├── upload.ts
│   │   └── validateRequest.ts
│   └── modules/
│       ├── auth/
│       │   ├── auth.controller.ts
│       │   ├── auth.service.ts
│       │   ├── auth.routes.ts
│       │   └── auth.validation.ts
│       ├── users/
│       │   ├── users.controller.ts
│       │   ├── users.service.ts
│       │   ├── users.routes.ts
│       │   └── users.validation.ts
│       ├── chat/
│       │   ├── chat.controller.ts
│       │   ├── chat.service.ts
│       │   ├── chat.routes.ts
│       │   └── chat.validation.ts
│       └── admin/
│           ├── admin.controller.ts
│           ├── admin.service.ts
│           ├── admin.routes.ts
│           └── admin.validation.ts
├── utils/
│   ├── apiErrors.ts
│   ├── catchAsync.ts
│   ├── sendResponse.ts
│   └── cloudinary.ts
├── types/
│   └── express.d.ts
├── app.ts
└── server.ts

```

## 📚 API Documentation

### Database Commands
```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (DB GUI)
npx prisma studio
```

## 🧪 Testing

Test the API using:
- **Postman** - REST API endpoints
- **Socket.IO Client Tool** - Real-time events
- **Browser Console** - Socket.IO connection testing

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Role-based access control
- Input validation with Zod
- File type and size validation
- SQL injection protection (Prisma ORM)
- CORS configuration

## 🚧 Future Enhancements

- [ ] Group chat support
- [ ] Guest user support (chat without registration)
- [ ] Message reactions (emoji)
- [ ] Email notifications for offline messages
- [ ] Message search functionality
- [ ] Voice/video call integration
- [ ] Message encryption
- [ ] Push notifications

```
LiveChat is a full-stack real-time chat platform built with Node.js, Express, Socket.IO, Prisma, and PostgreSQL on the backend and Next.js 15, Redux Toolkit, and Tailwind CSS on the frontend. It features one-to-one messaging with real-time delivery, file sharing via Cloudinary, typing indicators, read receipts, and online/offline presence. The platform includes role-based access control with separate dashboards for users and admins, JWT authentication with httpOnly cookies, and is fully deployed on Render and Vercel.

@itstumpa



```

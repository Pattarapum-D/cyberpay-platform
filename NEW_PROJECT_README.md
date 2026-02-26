# Game Top-up System - ระบบเติมเกมผ่าน UID

โปรเจกต์ใหม่ที่ใช้ Next.js 15.3.3 + NestJS 11.0.7 + PostgreSQL 18

## 📋 Tech Stack

### Frontend
- **Next.js 15.3.3** (App Router)
- **React 19**
- **TypeScript 5.8**
- **Tailwind CSS 3.4**
- **shadcn/ui** (Radix UI Components)
- **TanStack Query** (React Query)
- **Zustand** (State Management)

### Backend
- **NestJS 11.0.7**
- **TypeScript 5.8**
- **Prisma** (ORM)
- **PostgreSQL 18**
- **JWT Authentication**
- **Passport.js** (OAuth)
- **Nodemailer** (Email)

### Requirements
- **Node.js >= 22.0.0**
- **PostgreSQL 18**

---

## 🚀 การติดตั้ง

### 1. Clone และติดตั้ง Dependencies

```bash
# ติดตั้ง Backend
cd backend
npm install

# ติดตั้ง Frontend
cd ../frontend
npm install
```

### 2. Setup Database

```bash
# สร้าง PostgreSQL database
createdb game_topup_db

# หรือใช้ psql
psql -U postgres
CREATE DATABASE game_topup_db;
\q
```

### 3. Setup Environment Variables

#### Backend (.env)
```bash
cd backend
cp .env.example .env
# แก้ไขค่าใน .env ตามที่ต้องการ
```

#### Frontend (.env.local)
```bash
cd frontend
cp .env.example .env.local
# แก้ไขค่าใน .env.local ตามที่ต้องการ
```

### 4. Run Database Migrations

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 5. (Optional) Seed Database

```bash
cd backend
npx prisma db seed
```

---

## 🏃 การรันโปรเจกต์

### Development Mode

#### Terminal 1 - Backend
```bash
cd backend
npm run start:dev
```
Backend จะรันที่ http://localhost:3001

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend จะรันที่ http://localhost:3000

---

## 📁 โครงสร้างโปรเจกต์

```
project-root/
├── backend/                    # NestJS Backend
│   ├── prisma/
│   │   └── schema.prisma      # Database Schema
│   ├── src/
│   │   ├── auth/              # Authentication Module
│   │   ├── users/             # Users Module
│   │   ├── games/             # Games Module
│   │   ├── orders/            # Orders Module
│   │   ├── prisma/            # Prisma Service
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
│
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/               # App Router Pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── globals.css
│   │   ├── components/        # React Components
│   │   │   ├── ui/           # shadcn/ui Components
│   │   │   ├── header.tsx
│   │   │   ├── bottom-nav.tsx
│   │   │   └── ...
│   │   ├── hooks/            # Custom Hooks
│   │   ├── lib/              # Utilities
│   │   └── services/         # API Services
│   ├── .env.local
│   └── package.json
│
└── MIGRATION_PLAN.md          # แผนการ Migrate
```

---

## 🔑 Features

### Authentication
- ✅ Register / Login
- ✅ JWT Authentication
- ✅ Google OAuth
- ✅ Facebook OAuth
- ✅ Forgot Password / Reset Password
- ✅ Email Service

### Core Features
- ✅ Game Listing
- ✅ Package Selection
- ✅ Order Management
- ✅ Transaction History
- ✅ User Profile
- ✅ VIP System
- ✅ Top-up System

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - เข้าสู่ระบบ
- `POST /api/auth/forgot-password` - ลืมรหัสผ่าน
- `POST /api/auth/reset-password` - รีเซ็ตรหัสผ่าน
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/facebook` - Facebook OAuth
- `GET /api/auth/me` - ดูข้อมูลผู้ใช้

### Games
- `GET /api/games` - ดูรายการเกมทั้งหมด
- `GET /api/games/:slug` - ดูรายละเอียดเกม

### Orders
- `GET /api/orders` - ดูประวัติการสั่งซื้อ
- `POST /api/orders` - สร้างคำสั่งซื้อใหม่
- `GET /api/orders/:id` - ดูรายละเอียดคำสั่งซื้อ

### Users
- `GET /api/users/profile` - ดูโปรไฟล์

---

## 📝 Database Schema

### User
- id, email, password, name, avatar
- provider, providerId (OAuth)
- vipLevel, vipPoints, balance
- resetPasswordToken, resetPasswordExpires

### Order
- id, userId, gameId, gameName
- packageId, packageName, packagePrice
- uid (Game UID), status, paymentMethod

### Transaction
- id, userId, type, amount
- description, status

### Game
- id, name, slug, description
- image, category, isActive

### GamePackage
- id, gameId, name, description
- price, discount, isActive

---

## 🛠️ การ Deploy

### Backend (NestJS)
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend (Next.js)
```bash
cd frontend
npm run build
npm start
```

---

## 📚 เอกสารเพิ่มเติม

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT License

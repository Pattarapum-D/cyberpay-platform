# Changelog

## Version 2.0.0 - Major Rewrite (2026-02-23)

### 🎉 Major Changes

โปรเจกต์ถูก rewrite ใหม่ทั้งหมดด้วย tech stack ที่ทันสมัยกว่า:

#### Frontend
- ✅ เปลี่ยนจาก **React 18 + Vite** → **Next.js 15.3.3** (App Router)
- ✅ อัพเกรดเป็น **React 19**
- ✅ ใช้ **TypeScript 5.8**
- ✅ เก็บ **Tailwind CSS** และ **shadcn/ui** ไว้
- ✅ เพิ่ม **Zustand** สำหรับ state management
- ✅ ใช้ **TanStack Query** สำหรับ data fetching

#### Backend
- ✅ เปลี่ยนจาก **Express.js** → **NestJS 11.0.7**
- ✅ Architecture แบบ modular (Controllers, Services, Modules)
- ✅ Dependency Injection
- ✅ Decorators-based routing
- ✅ เก็บ JWT Authentication ไว้

#### Database
- ✅ เปลี่ยนจาก **MongoDB + Mongoose** → **PostgreSQL 18 + Prisma**
- ✅ Type-safe database queries
- ✅ Auto-generated types
- ✅ Migration system

### 📦 New Features

- ✅ Server-side rendering (SSR) ด้วย Next.js
- ✅ API Routes ใน Next.js (optional)
- ✅ Improved type safety ทั้งระบบ
- ✅ Better error handling
- ✅ Structured logging
- ✅ Database migrations
- ✅ Better development experience

### 🗂️ Project Structure

```
cyberpay-platform/
├── backend/          # NestJS Backend (NEW)
├── frontend/         # Next.js Frontend (NEW)
├── old/             # โค้ดเก่า (React + Vite + Express)
└── README.md
```

### 🔧 Breaking Changes

- ⚠️ API endpoints เปลี่ยนจาก `/api/*` → `/api/*` (เหมือนเดิมแต่ structure ต่าง)
- ⚠️ Database schema เปลี่ยนจาก MongoDB collections → PostgreSQL tables
- ⚠️ Authentication flow เปลี่ยนเล็กน้อย (JWT payload structure)
- ⚠️ Environment variables เปลี่ยนชื่อบางตัว

### 📝 Migration Notes

- โค้ดเก่าทั้งหมดถูกย้ายไปที่ `old/` folder
- สามารถอ้างอิงโค้ดเก่าได้ตลอดเวลา
- ดูคู่มือการ migrate ได้ที่ [MIGRATION_PLAN.md](./MIGRATION_PLAN.md)
- ดูคู่มือการติดตั้งได้ที่ [SETUP_GUIDE.md](./SETUP_GUIDE.md)

### 🚀 Getting Started

```bash
# ติดตั้ง dependencies
npm run install:all

# Setup database
cd backend
npx prisma generate
npx prisma migrate dev

# รันโปรเจกต์
npm run dev
```

### 📚 Documentation

- [README.md](./README.md) - Overview
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - คู่มือการติดตั้งโดยละเอียด
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) - แผนการ migrate
- [backend/README.md](./backend/README.md) - Backend documentation
- [frontend/README.md](./frontend/README.md) - Frontend documentation

---

## Version 1.0.0 - Initial Release

### Features
- ✅ React 18 + Vite
- ✅ Express.js Backend
- ✅ MongoDB Database
- ✅ JWT Authentication
- ✅ Google OAuth
- ✅ Email Service
- ✅ Game Top-up System

> โค้ดเวอร์ชันนี้อยู่ใน `old/` folder

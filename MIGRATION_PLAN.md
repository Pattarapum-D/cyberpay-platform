# แผนการ Migrate โปรเจกต์

## Tech Stack เดิม → ใหม่

### Frontend
- **เดิม**: React 18 + Vite 5 + React Router
- **ใหม่**: Next.js 15.3.3 + App Router

### Backend
- **เดิม**: Express.js + Node.js
- **ใหม่**: NestJS 11.0.7

### Database
- **เดิม**: MongoDB + Mongoose
- **ใหม่**: PostgreSQL 18 + Prisma

### Node.js Version
- **ต้องการ**: Node.js 22+

---

## ขั้นตอนการ Migrate

### Phase 1: Setup โปรเจกต์ใหม่
1. ✅ สร้างโครงสร้างโฟลเดอร์ frontend/ และ backend/
2. ✅ Setup Next.js 15.3.3
3. ✅ Setup NestJS 11.0.7
4. ✅ Setup PostgreSQL + Prisma

### Phase 2: Database Migration
1. ออกแบบ PostgreSQL schema จาก MongoDB models
2. สร้าง Prisma schema
3. Generate migrations

### Phase 3: Backend Migration
1. Migrate authentication (JWT, OAuth)
2. Migrate API endpoints
3. Migrate email service
4. Setup CORS และ security

### Phase 4: Frontend Migration
1. Migrate pages → app directory
2. Migrate components (shadcn/ui)
3. Migrate routing
4. Migrate authentication flow
5. Migrate API calls

### Phase 5: Testing & Deployment
1. Test ทุก features
2. Setup environment variables
3. Documentation

---

## Features ที่ต้อง Migrate

### Authentication
- [x] Register
- [x] Login
- [x] Forgot Password
- [x] Reset Password
- [x] Google OAuth
- [x] Facebook OAuth
- [x] JWT Authentication

### Pages
- [x] Home/Index
- [x] Top Up
- [x] History
- [x] VIP
- [x] Support

### Components
- [x] Header
- [x] Bottom Navigation
- [x] Game Card
- [x] Package Card
- [x] Payment Method Card
- [x] Search Bar
- [x] All shadcn/ui components

---

## การเริ่มต้นใช้งาน

### Prerequisites
```bash
node --version  # ต้อง >= 22
```

### Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### Setup Backend
```bash
cd backend
npm install
npm run start:dev
```

### Setup Database
```bash
# Install PostgreSQL 18
# Create database
createdb game_topup_db

# Run migrations
cd backend
npx prisma migrate dev
```

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/game_topup_db
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_password
FRONTEND_URL=http://localhost:3000
PORT=3001
```

---

## Notes
- Next.js 15 ใช้ App Router (ไม่ใช่ Pages Router)
- NestJS ใช้ TypeScript เป็นหลัก
- PostgreSQL ต้องออกแบบ schema ให้ดี (relations, indexes)
- Prisma จะช่วยจัดการ migrations และ type safety

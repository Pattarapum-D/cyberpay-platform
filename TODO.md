# 📝 TODO List

## 🚀 ขั้นตอนถัดไป (ต้องทำก่อนใช้งาน)

### 1. ติดตั้งและ Setup ✅ ต้องทำ

- [ ] ติดตั้ง Node.js 22+
- [ ] ติดตั้ง PostgreSQL 18
- [ ] รัน `npm run install:all`
- [ ] สร้าง database: `createdb game_topup_db`
- [ ] Copy `.env.example` → `.env` (backend)
- [ ] Copy `.env.example` → `.env.local` (frontend)
- [ ] แก้ไข `DATABASE_URL` ใน `backend/.env`
- [ ] แก้ไข `JWT_SECRET` ใน `backend/.env`
- [ ] รัน `cd backend && npx prisma generate`
- [ ] รัน `npx prisma migrate dev`
- [ ] ทดสอบรัน `npm run dev`

### 2. ตั้งค่า OAuth (Optional)

#### Google OAuth
- [ ] สร้าง project ใน Google Cloud Console
- [ ] เปิดใช้งาน Google+ API
- [ ] สร้าง OAuth 2.0 Client ID
- [ ] เพิ่ม redirect URI: `http://localhost:3001/api/auth/google/callback`
- [ ] Copy Client ID และ Secret ไปใส่ใน `.env`

#### Facebook OAuth
- [ ] สร้าง app ใน Facebook Developers
- [ ] เพิ่ม Facebook Login product
- [ ] ตั้งค่า redirect URI: `http://localhost:3001/api/auth/facebook/callback`
- [ ] Copy App ID และ Secret ไปใส่ใน `.env`

### 3. ตั้งค่า Email Service

- [ ] เปิด 2-Step Verification ใน Google Account
- [ ] สร้าง App Password
- [ ] ใส่ App Password ใน `EMAIL_PASSWORD` ใน `.env`

### 4. Seed ข้อมูล (Optional)

- [ ] สร้างไฟล์ `backend/prisma/seed.ts`
- [ ] เพิ่มข้อมูลเกมตัวอย่าง
- [ ] เพิ่มข้อมูล packages
- [ ] รัน `npx prisma db seed`

---

## 🎨 Features ที่ควรเพิ่ม

### Frontend

- [ ] หน้า History (ประวัติการทำรายการ)
- [ ] หน้า Profile (แก้ไขโปรไฟล์)
- [ ] หน้า Top-up (เติมเงิน)
- [ ] หน้า VIP (ระบบสมาชิก VIP)
- [ ] หน้า Support (ติดต่อสนับสนุน)
- [ ] หน้า Game Detail (รายละเอียดเกม)
- [ ] หน้า Order Detail (รายละเอียดคำสั่งซื้อ)
- [ ] Loading States
- [ ] Error Boundaries
- [ ] SEO Optimization (metadata)
- [ ] Image Optimization
- [ ] Skeleton Loaders

### Backend

- [ ] Payment Integration (Stripe/PayPal/PromptPay)
- [ ] Order Processing Logic
- [ ] Transaction Management
- [ ] VIP System Logic
- [ ] Email Templates (HTML)
- [ ] Rate Limiting
- [ ] API Documentation (Swagger)
- [ ] Logging System
- [ ] Error Tracking (Sentry)
- [ ] File Upload (Avatar)
- [ ] Admin Panel APIs
- [ ] Analytics APIs

### Database

- [ ] Seed Script
- [ ] Backup Strategy
- [ ] Indexes Optimization
- [ ] Full-text Search
- [ ] Soft Delete
- [ ] Audit Logs

---

## 🔧 Improvements

### Performance

- [ ] Image CDN
- [ ] API Caching (Redis)
- [ ] Database Query Optimization
- [ ] Code Splitting
- [ ] Lazy Loading
- [ ] Service Worker (PWA)

### Security

- [ ] Rate Limiting
- [ ] CSRF Protection
- [ ] XSS Protection
- [ ] SQL Injection Prevention (Prisma handles this)
- [ ] Input Validation
- [ ] Password Strength Checker
- [ ] 2FA (Two-Factor Authentication)

### Testing

- [ ] Unit Tests (Backend)
- [ ] Integration Tests (Backend)
- [ ] E2E Tests (Frontend)
- [ ] API Tests
- [ ] Load Testing

### DevOps

- [ ] Docker Setup
- [ ] CI/CD Pipeline (GitHub Actions)
- [ ] Environment Management
- [ ] Monitoring (Prometheus/Grafana)
- [ ] Logging (ELK Stack)

---

## 📱 Mobile

- [ ] React Native App
- [ ] Flutter App
- [ ] PWA Optimization

---

## 🌐 Deployment

### Backend

- [ ] Deploy to Railway/Render/Heroku
- [ ] Setup Environment Variables
- [ ] Database Migration
- [ ] Health Check Endpoint
- [ ] Monitoring

### Frontend

- [ ] Deploy to Vercel/Netlify
- [ ] Setup Environment Variables
- [ ] Custom Domain
- [ ] SSL Certificate
- [ ] Analytics (Google Analytics)

### Database

- [ ] Deploy to Supabase/Railway
- [ ] Backup Strategy
- [ ] Connection Pooling
- [ ] Read Replicas

---

## 📚 Documentation

- [ ] API Documentation (Swagger/OpenAPI)
- [ ] User Guide
- [ ] Developer Guide
- [ ] Deployment Guide
- [ ] Troubleshooting Guide
- [ ] Contributing Guide
- [ ] Code Comments
- [ ] Architecture Diagram

---

## 🐛 Known Issues

- [ ] ไม่มี (ยังไม่ได้ทดสอบ)

---

## 💡 Ideas

- [ ] Multi-language Support (i18n)
- [ ] Dark/Light Theme Toggle
- [ ] Notification System
- [ ] Referral System
- [ ] Loyalty Points
- [ ] Discount Coupons
- [ ] Live Chat Support
- [ ] Social Media Integration
- [ ] Game Reviews/Ratings
- [ ] Wishlist Feature

---

## 📊 Priority

### High Priority (ต้องทำก่อน)
1. ติดตั้งและ Setup
2. Seed ข้อมูล
3. หน้า Game Detail
4. Payment Integration
5. Order Processing

### Medium Priority
1. หน้า History
2. หน้า Profile
3. Email Templates
4. Admin Panel
5. Testing

### Low Priority
1. PWA
2. Mobile App
3. Advanced Features
4. Optimization

---

## ✅ Completed

- [x] Project Structure
- [x] Backend Setup (NestJS)
- [x] Frontend Setup (Next.js)
- [x] Database Schema (Prisma)
- [x] Authentication (JWT, OAuth)
- [x] Basic Pages (Login, Register, Home)
- [x] UI Components (shadcn/ui)
- [x] Documentation

---

## 📝 Notes

- ใช้ Prisma Studio เพื่อดูและแก้ไขข้อมูล: `npm run prisma:studio`
- ดู API logs ใน terminal ที่รัน backend
- ใช้ React DevTools และ Network tab เพื่อ debug
- อ่าน documentation ใน `SETUP_GUIDE.md` และ `QUICK_START.md`

---

**Last Updated**: 2026-02-23

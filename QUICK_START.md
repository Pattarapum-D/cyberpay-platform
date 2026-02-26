# 🚀 Quick Start Guide

เริ่มต้นใช้งานโปรเจกต์ภายใน 5 นาที!

## ✅ Prerequisites

- Node.js 22+ ([ดาวน์โหลด](https://nodejs.org/))
- PostgreSQL 18 ([ดาวน์โหลด](https://www.postgresql.org/download/))

## 📦 ติดตั้งแบบเร็ว

### 1. ติดตั้ง Dependencies

```bash
npm run install:all
```

### 2. สร้าง Database

```bash
# เปิด PostgreSQL
psql -U postgres

# สร้าง database
CREATE DATABASE game_topup_db;
\q
```

### 3. Setup Environment

```bash
# Backend
cd backend
cp .env.example .env

# Frontend  
cd ../frontend
cp .env.example .env.local
cd ..
```

**แก้ไข `backend/.env`:**
```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/game_topup_db"
JWT_SECRET="change-this-to-random-string"
```

### 4. Run Migrations

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
cd ..
```

### 5. รันโปรเจกต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ http://localhost:3000 🎉

---

## 🎯 ทดสอบระบบ

### 1. สมัครสมาชิก
- ไปที่ http://localhost:3000/register
- กรอกข้อมูล: อีเมล, รหัสผ่าน, ชื่อ
- คลิก "สมัครสมาชิก"

### 2. เข้าสู่ระบบ
- ไปที่ http://localhost:3000/login
- กรอกอีเมลและรหัสผ่าน
- คลิก "เข้าสู่ระบบ"

### 3. ดูหน้าหลัก
- จะเห็นรายการเกม
- สามารถค้นหาเกมได้
- คลิกเกมเพื่อดูรายละเอียด

---

## 🛠️ คำสั่งที่ใช้บ่อย

```bash
# รันทั้งหมด
npm run dev

# รัน Backend อย่างเดียว
npm run dev:backend

# รัน Frontend อย่างเดียว
npm run dev:frontend

# ดู Database
npm run prisma:studio

# Build Production
npm run build
```

---

## 📱 Ports

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Prisma Studio**: http://localhost:5555

---

## 🐛 แก้ปัญหาเบื้องต้น

### Database Connection Error
```bash
# ตรวจสอบว่า PostgreSQL รันอยู่
# Windows: เปิด Services → PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql
```

### Port Already in Use
```bash
# เปลี่ยน port ใน backend/.env
PORT=3002
```

### Module Not Found
```bash
# ติดตั้ง dependencies ใหม่
npm run install:all
```

---

## 📚 เอกสารเพิ่มเติม

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - คู่มือติดตั้งแบบละเอียด
- [README.md](./README.md) - ข้อมูลโปรเจกต์
- [MIGRATION_PLAN.md](./MIGRATION_PLAN.md) - แผนการ migrate

---

## 💡 Tips

1. ใช้ **Prisma Studio** เพื่อดูและแก้ไขข้อมูลใน database
2. ดู **API Documentation** ที่ `API_DOCUMENTATION.md`
3. โค้ดเก่าอยู่ใน `old/` folder สามารถอ้างอิงได้
4. ใช้ **VS Code** + **Prisma Extension** สำหรับ autocomplete

---

## 🎉 เริ่มต้นพัฒนา!

ตอนนี้คุณพร้อมแล้ว! เริ่มพัฒนา features ใหม่ๆ ได้เลย

Happy Coding! 🚀

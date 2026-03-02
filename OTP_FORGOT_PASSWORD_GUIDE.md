# 🔐 คู่มือระบบ Forgot Password แบบ OTP

ระบบรีเซ็ตรหัสผ่านด้วย OTP (One-Time Password) 6 หลัก ส่งผ่านอีเมล

## ✨ Features

- ✅ ส่งรหัส OTP 6 หลักไปที่อีเมล
- ✅ OTP หมดอายุใน 10 นาที
- ✅ จำกัดการลองผิด 5 ครั้ง
- ✅ สามารถขอ OTP ใหม่ได้
- ✅ UI/UX สวยงามแบบ Cyber-themed
- ✅ Real-time countdown timer
- ✅ Auto-focus ระหว่าง input OTP
- ✅ รองรับ paste OTP
- ✅ Password strength indicator
- ✅ Development mode (ไม่ต้องตั้งค่า email)

## 📋 Flow การทำงาน

```
1. ผู้ใช้กรอก email ที่หน้า /forgot-password
   ↓
2. Backend สร้าง OTP 6 หลัก และบันทึกใน database
   ↓
3. ส่ง OTP ไปที่อีเมล (หรือแสดงใน console ถ้า dev mode)
   ↓
4. Redirect ไปหน้า /verify-otp?email=xxx
   ↓
5. ผู้ใช้กรอก OTP และรหัสผ่านใหม่
   ↓
6. Backend ตรวจสอบ OTP และอัพเดทรหัสผ่าน
   ↓
7. Redirect ไปหน้า /login
```

## 🗄️ Database Schema

```prisma
model User {
  // ... existing fields
  otpCode           String?
  otpExpires        DateTime?
  otpAttempts       Int       @default(0)
}
```

## 🔧 Backend API

### 1. POST /api/auth/send-otp
ส่งรหัส OTP ไปที่อีเมล

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "If email exists, OTP has been sent"
}
```

**Logic:**
- สร้าง OTP 6 หลัก (100000-999999)
- ตั้งเวลาหมดอายุ 10 นาที
- Reset otpAttempts เป็น 0
- ส่งอีเมล (หรือ log ใน console)

### 2. POST /api/auth/verify-otp
ตรวจสอบ OTP และรีเซ็ตรหัสผ่าน

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewPassword123!"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

**Validation:**
- ตรวจสอบว่ามี OTP หรือไม่
- ตรวจสอบว่า OTP หมดอายุหรือไม่
- ตรวจสอบจำนวนครั้งที่ลองผิด (max 5)
- ตรวจสอบว่า OTP ถูกต้องหรือไม่
- Hash รหัสผ่านใหม่และบันทึก
- ลบ OTP ออกจาก database

## 🎨 Frontend Pages

### 1. /forgot-password
หน้ากรอกอีเมลเพื่อขอ OTP

**Features:**
- Email validation
- Loading state
- Error handling
- Redirect to /verify-otp

### 2. /verify-otp?email=xxx
หน้ากรอก OTP และรหัสผ่านใหม่

**Features:**
- 6 input boxes สำหรับ OTP
- Auto-focus ระหว่าง input
- รองรับ paste OTP
- Countdown timer (10 นาที)
- ปุ่มขอ OTP ใหม่
- Password strength indicator
- Show/hide password
- Real-time validation

## 🧪 การทดสอบ

### Development Mode (ไม่ต้องตั้งค่า email)

1. **เริ่ม Backend:**
```bash
cd backend
npm run start:dev
```

2. **เริ่ม Frontend:**
```bash
cd frontend
npm run dev
```

3. **ทดสอบ:**
   - ไปที่ http://localhost:3000/forgot-password
   - กรอก email ที่ลงทะเบียนไว้
   - กดส่ง OTP
   - ดู OTP ใน backend terminal:
   ```
   ================================================================================
   📧 OTP Email (Development Mode)
   ================================================================================
   To: user@example.com
   OTP Code: 123456
   Expires in: 10 minutes
   ================================================================================
   ```
   - คัดลอก OTP ไปกรอกในหน้า verify-otp
   - ตั้งรหัสผ่านใหม่
   - ทดสอบเข้าสู่ระบบ

### Production Mode (ตั้งค่า email จริง)

แก้ไข `backend/.env`:
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="your-email@gmail.com"          # Gmail ของคุณ
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"       # App Password จาก Google
EMAIL_FROM="CYBERPAY <noreply@cyberpay.com>"
```

**วิธีสร้าง Gmail App Password:**
1. ไปที่ https://myaccount.google.com/apppasswords
2. เปิด 2-Step Verification (ถ้ายังไม่ได้เปิด)
3. สร้าง App Password ใหม่
4. คัดลอก password 16 ตัวอักษร
5. ใส่ใน EMAIL_PASSWORD

## 📧 Email Template

OTP email จะมีหน้าตาแบบนี้:

```
หัวข้อ: รหัส OTP สำหรับรีเซ็ตรหัสผ่าน - CYBERPAY

🎮 CYBERPAY
รหัส OTP สำหรับรีเซ็ตรหัสผ่าน

รหัส OTP ของคุณคือ

┌─────────┐
│ 123456  │
└─────────┘

⏰ รหัส OTP นี้จะหมดอายุใน 10 นาที
🔒 กรุณาอย่าแชร์รหัสนี้กับผู้อื่น

หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยอีเมลนี้

© 2024 CYBERPAY. All rights reserved.
```

## 🔒 Security Features

### 1. OTP Expiration
- OTP หมดอายุใน 10 นาที
- ตรวจสอบเวลาหมดอายุก่อนยืนยัน

### 2. Rate Limiting
- จำกัดการลองผิด 5 ครั้ง
- ต้องขอ OTP ใหม่หลังครบ 5 ครั้ง

### 3. One-Time Use
- OTP ใช้ได้ครั้งเดียว
- ถูกลบทันทีหลังใช้งานสำเร็จ

### 4. Email Privacy
- ไม่เปิดเผยว่า email มีในระบบหรือไม่
- Response เหมือนกันทุกกรณี

### 5. Password Requirements
- อย่างน้อย 8 ตัวอักษร
- มีตัวพิมพ์ใหญ่ (A-Z)
- มีตัวพิมพ์เล็ก (a-z)
- มีตัวเลข (0-9)
- มีอักขระพิเศษ (!@#$%^&*)

## 🎯 Test Cases

### ✅ Happy Path
1. กรอก email ที่มีในระบบ
2. ได้รับ OTP
3. กรอก OTP ถูกต้อง
4. ตั้งรหัสผ่านใหม่
5. เข้าสู่ระบบสำเร็จ

### ❌ Error Cases

**1. Email ไม่มีในระบบ**
- Response: "If email exists, OTP has been sent"
- ไม่เปิดเผยว่า email ไม่มี

**2. OTP หมดอายุ**
- Error: "OTP has expired. Please request a new one"
- แสดงปุ่มขอ OTP ใหม่

**3. OTP ผิด**
- Error: "Invalid OTP"
- เพิ่ม otpAttempts
- ถ้าครบ 5 ครั้ง: "Too many failed attempts"

**4. รหัสผ่านไม่ตรงตามเงื่อนไข**
- แสดง password requirements
- Disable ปุ่ม submit

**5. ไม่มี email parameter**
- Redirect กลับไปหน้า /forgot-password

## 🚀 Production Checklist

- [ ] ตั้งค่า email service จริง (Gmail, SendGrid, AWS SES)
- [ ] เปลี่ยน OTP expiration time ตามต้องการ
- [ ] ตั้งค่า rate limiting ที่ API level
- [ ] เพิ่ม CAPTCHA ถ้าจำเป็น
- [ ] ตั้งค่า monitoring และ logging
- [ ] ทดสอบ email delivery
- [ ] ตรวจสอบ spam score ของ email
- [ ] เพิ่ม email template ที่สวยงาม
- [ ] ตั้งค่า error tracking (Sentry, etc.)
- [ ] ทดสอบ load testing

## 🐛 Troubleshooting

### ไม่ได้รับ OTP
1. ตรวจสอบ spam folder
2. ตรวจสอบว่า email ถูกต้อง
3. ดู backend logs
4. ตรวจสอบ EMAIL_USER และ EMAIL_PASSWORD

### OTP หมดอายุเร็วเกินไป
- แก้ไข expiration time ใน `auth.service.ts`:
```typescript
const otpExpires = new Date(Date.now() + 600000); // 10 minutes
```

### ส่ง Email ไม่ได้
- ตรวจสอบ Gmail App Password
- ตรวจสอบว่าเปิด 2-Step Verification
- ลองใช้ Development Mode ก่อน

### OTP ไม่ถูกต้อง
- ตรวจสอบว่าคัดลอก OTP ถูกต้อง
- ตรวจสอบว่า OTP ยังไม่หมดอายุ
- ตรวจสอบจำนวนครั้งที่ลองผิด

## 💡 Tips

1. **Development**: ใช้ Development Mode ไม่ต้องตั้งค่า email
2. **Testing**: สร้าง test users หลายคนเพื่อทดสอบ
3. **Security**: อย่าเปิดเผย error details ใน production
4. **UX**: แสดง countdown timer ให้ชัดเจน
5. **Email**: ใช้ email service ที่เชื่อถือได้ใน production

## 📊 Monitoring

ควร monitor metrics เหล่านี้:

- จำนวน OTP ที่ส่งต่อวัน
- Success rate ของการรีเซ็ตรหัสผ่าน
- จำนวนครั้งที่ OTP หมดอายุ
- จำนวนครั้งที่ลองผิด
- Email delivery rate
- Average time to complete reset

## 🔄 Comparison: OTP vs Reset Link

| Feature | OTP | Reset Link |
|---------|-----|------------|
| Security | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| UX | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Expiration | 10 นาที | 1 ชั่วโมง |
| Steps | 2 หน้า | 2 หน้า |
| Email Dependency | สูง | ปานกลาง |
| Mobile Friendly | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 📝 Code Structure

```
backend/
├── src/auth/
│   ├── dto/
│   │   └── verify-otp.dto.ts          # OTP DTOs
│   ├── auth.controller.ts             # +2 endpoints
│   ├── auth.service.ts                # +2 methods
│   └── email.service.ts               # +1 method
├── prisma/
│   └── schema.prisma                  # +3 fields

frontend/
├── src/
│   ├── app/
│   │   ├── forgot-password/
│   │   │   └── page.tsx               # แก้ไข: ส่ง OTP
│   │   └── verify-otp/
│   │       └── page.tsx               # ใหม่: ยืนยัน OTP
│   └── lib/
│       └── api.ts                     # +2 functions
```

---

ระบบพร้อมใช้งานแล้ว! 🎉

ลองทดสอบด้วย Development Mode ก่อน แล้วค่อยตั้งค่า email จริงทีหลัง

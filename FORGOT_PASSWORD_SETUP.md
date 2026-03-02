# คู่มือการตั้งค่าระบบ Forgot Password

ระบบ Forgot Password ของคุณมีโค้ดครบถ้วนแล้ว! เพียงแค่ตั้งค่า email และทดสอบ

## 📋 สิ่งที่มีอยู่แล้ว

### ✅ Frontend (Next.js)
- หน้า Forgot Password: `/forgot-password`
- หน้า Reset Password: `/reset-password?token=xxx`
- API functions ครบถ้วน

### ✅ Backend (NestJS)
- API endpoints สำหรับ forgot/reset password
- Email service พร้อมใช้งาน
- Database schema มี reset token fields

## 🔧 การตั้งค่า Email

### ตัวเลือก 1: ใช้ Gmail (แนะนำสำหรับ Development)

1. **สร้าง App Password ของ Gmail**:
   - ไปที่ https://myaccount.google.com/security
   - เปิด "2-Step Verification" (ถ้ายังไม่ได้เปิด)
   - ไปที่ "App passwords"
   - สร้าง app password ใหม่
   - คัดลอก password 16 ตัวอักษร

2. **แก้ไข `backend/.env`**:
```env
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="your-email@gmail.com"          # เปลี่ยนเป็น email ของคุณ
EMAIL_PASSWORD="xxxx xxxx xxxx xxxx"       # ใส่ app password ที่ได้
EMAIL_FROM="CYBERPAY <noreply@cyberpay.com>"
```

### ตัวเลือก 2: Development Mode (ไม่ต้องตั้งค่า Email)

ถ้าไม่ต้องการตั้งค่า email จริง ระบบจะแสดง reset URL ใน console แทน:

```env
EMAIL_USER="your-email@gmail.com"  # เก็บค่าเดิมไว้
```

เมื่อมีคนขอรีเซ็ตรหัสผ่าน จะเห็น URL ใน terminal:
```
================================================================================
📧 Password Reset Email (Development Mode)
================================================================================
To: user@example.com
Reset URL: http://localhost:3000/reset-password?token=abc123xyz
================================================================================
```

### ตัวเลือก 3: Email Services อื่นๆ

#### Outlook/Hotmail
```env
EMAIL_HOST="smtp-mail.outlook.com"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="your-email@outlook.com"
EMAIL_PASSWORD="your-password"
```

#### SendGrid
```env
EMAIL_HOST="smtp.sendgrid.net"
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
```

## 🧪 การทดสอบ

### 1. เริ่ม Backend
```bash
cd backend
npm run start:dev
```

### 2. เริ่ม Frontend
```bash
cd frontend
npm run dev
```

### 3. ทดสอบ Forgot Password

1. ไปที่ http://localhost:3000/forgot-password
2. กรอก email ที่ลงทะเบียนไว้
3. กดปุ่ม "ส่งลิงก์รีเซ็ตรหัสผ่าน"

**Development Mode**: ดู reset URL ใน backend terminal แล้วคัดลอกไปเปิดในเบราว์เซอร์

**Production Mode**: ตรวจสอบอีเมล และคลิกลิงก์

4. ตั้งรหัสผ่านใหม่ที่หน้า reset-password
5. ทดสอบเข้าสู่ระบบด้วยรหัสผ่านใหม่

## 🔒 ความปลอดภัย

- Reset token หมดอายุใน 1 ชั่วโมง
- Token ใช้ได้ครั้งเดียว (ถูกลบหลังรีเซ็ตสำเร็จ)
- ไม่เปิดเผยว่า email มีอยู่ในระบบหรือไม่
- รหัสผ่านถูก hash ด้วย bcrypt

## 📝 API Endpoints

### POST /api/auth/forgot-password
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "message": "If email exists, reset link has been sent"
}
```

### POST /api/auth/reset-password
```json
{
  "token": "abc123xyz",
  "password": "NewPassword123!"
}
```

Response:
```json
{
  "message": "Password reset successful"
}
```

## 🐛 Troubleshooting

### ส่ง Email ไม่ได้
- ตรวจสอบว่าใช้ App Password ไม่ใช่รหัสผ่านปกติ
- ตรวจสอบว่าเปิด 2-Step Verification แล้ว
- ลองใช้ Development Mode ก่อน

### Token หมดอายุ
- Token หมดอายุใน 1 ชั่วโมง
- ขอ reset link ใหม่ที่หน้า forgot-password

### ไม่ได้รับอีเมล
- ตรวจสอบ spam folder
- ตรวจสอบว่า email ถูกต้อง
- ดู backend logs เพื่อดู error

## 🎨 UI Features

### หน้า Forgot Password
- ✅ Cyber-themed design
- ✅ Email validation
- ✅ Loading states
- ✅ Success message
- ✅ Error handling

### หน้า Reset Password
- ✅ Password strength indicator
- ✅ Show/hide password
- ✅ Real-time validation
- ✅ Token validation
- ✅ Expired token handling

## 🚀 Production Checklist

- [ ] ตั้งค่า email service จริง (SendGrid, AWS SES, etc.)
- [ ] เปลี่ยน `FRONTEND_URL` เป็น production URL
- [ ] ตั้งค่า rate limiting สำหรับ forgot-password endpoint
- [ ] เพิ่ม CAPTCHA ถ้าจำเป็น
- [ ] ตั้งค่า email template ที่สวยงาม
- [ ] เพิ่ม logging และ monitoring

## 📧 ตัวอย่าง Email Template

Email ที่ส่งไปจะมีหน้าตาแบบนี้:

```
หัวข้อ: รีเซ็ตรหัสผ่าน - Game Top-up

คุณได้ขอรีเซ็ตรหัสผ่านสำหรับบัญชีของคุณ

กรุณาคลิกลิงก์ด้านล่างเพื่อรีเซ็ตรหัสผ่าน:

[รีเซ็ตรหัสผ่าน]

ลิงก์นี้จะหมดอายุใน 1 ชั่วโมง

หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยอีเมลนี้
```

## 💡 Tips

1. **Development**: ใช้ Development Mode ไม่ต้องตั้งค่า email
2. **Testing**: สร้าง test user หลายๆ คนเพื่อทดสอบ
3. **Security**: อย่าเปิดเผย error details ใน production
4. **UX**: แสดงข้อความเดียวกันไม่ว่า email จะมีหรือไม่มี

---

ระบบพร้อมใช้งานแล้ว! 🎉

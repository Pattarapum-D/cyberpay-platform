# 🔐 สรุป Flow การทำงานของระบบ OTP Forgot Password

## 📱 User Flow (3 หน้า)

### หน้าที่ 1: `/forgot-password` - ขอรหัส OTP

```
┌─────────────────────────────────┐
│   🎮 CYBERPAY                   │
│   รีเซ็ตรหัสผ่านของคุณ          │
├─────────────────────────────────┤
│                                 │
│   ลืมรหัสผ่าน                   │
│   กรอกอีเมลของคุณเพื่อรับรหัส OTP│
│                                 │
│   Email                         │
│   ┌───────────────────────────┐ │
│   │ 📧 your@email.com         │ │
│   └───────────────────────────┘ │
│                                 │
│   ┌───────────────────────────┐ │
│   │    ส่งรหัส OTP           │ │
│   └───────────────────────────┘ │
│                                 │
│   จำรหัสผ่านได้แล้ว? เข้าสู่ระบบ│
└─────────────────────────────────┘
```

**Actions:**
- กรอก email
- กดปุ่ม "ส่งรหัส OTP"
- Backend ส่ง OTP ไปที่อีเมล
- แสดงหน้า success

### หน้าที่ 2: `/forgot-password` (หลังส่ง OTP)

```
┌─────────────────────────────────┐
│   🎮 CYBERPAY                   │
├─────────────────────────────────┤
│                                 │
│   ตรวจสอบอีเมล                  │
│   เราได้ส่งรหัส OTP ไปยัง       │
│                                 │
│   ┌───────────────────────────┐ │
│   │  📧                       │ │
│   │  user@example.com         │ │
│   └───────────────────────────┘ │
│                                 │
│   กรุณาตรวจสอบอีเมลและกรอกรหัส  │
│   OTP 6 หลัก                    │
│   รหัส OTP จะหมดอายุใน 10 นาที  │
│                                 │
│   ┌───────────────────────────┐ │
│   │    ไปกรอกรหัส OTP         │ │
│   └───────────────────────────┘ │
│                                 │
│   ← ส่งรหัส OTP ใหม่            │
└─────────────────────────────────┘
```

**Actions:**
- คลิก "ไปกรอกรหัส OTP" → ไปหน้า verify-otp
- คลิก "ส่งรหัส OTP ใหม่" → กลับไปหน้าแรก

### หน้าที่ 3: `/verify-otp?email=xxx` - ยืนยัน OTP และตั้งรหัสผ่านใหม่

```
┌─────────────────────────────────┐
│   🎮 CYBERPAY                   │
│   ยืนยันรหัส OTP                │
├─────────────────────────────────┤
│                                 │
│   กรอกรหัส OTP                  │
│   เราได้ส่งรหัส 6 หลักไปที่     │
│   user@example.com              │
│                                 │
│   รหัส OTP                      │
│   ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐     │
│   │1│ │2│ │3│ │4│ │5│ │6│     │
│   └─┘ └─┘ └─┘ └─┘ └─┘ └─┘     │
│                                 │
│   รหัส OTP จะหมดอายุใน 9:45     │
│   ส่งรหัส OTP ใหม่              │
│                                 │
│   รหัสผ่านใหม่                  │
│   ┌───────────────────────────┐ │
│   │ 🔒 ••••••••          👁   │ │
│   └───────────────────────────┘ │
│                                 │
│   ยืนยันรหัสผ่านใหม่            │
│   ┌───────────────────────────┐ │
│   │ 🔒 ••••••••          👁   │ │
│   └───────────────────────────┘ │
│                                 │
│   รหัสผ่านต้องมี:               │
│   ✓ อย่างน้อย 8 ตัวอักษร       │
│   ✓ ตัวพิมพ์ใหญ่ (A-Z)          │
│   ✓ ตัวพิมพ์เล็ก (a-z)          │
│   ✓ ตัวเลข (0-9)                │
│   ✓ อักขระพิเศษ (!@#$%^&*)     │
│   ✓ รหัสผ่านตรงกัน              │
│                                 │
│   ┌───────────────────────────┐ │
│   │  ยืนยันและรีเซ็ตรหัสผ่าน  │ │
│   └───────────────────────────┘ │
│                                 │
│   ← กลับไปหน้าลืมรหัสผ่าน       │
└─────────────────────────────────┘
```

**Features:**
- 6 input boxes สำหรับ OTP
- Auto-focus ระหว่าง input
- รองรับ paste OTP
- Countdown timer (10 นาที)
- ปุ่มขอ OTP ใหม่ (เมื่อหมดเวลา)
- Password strength indicator
- Show/hide password
- Real-time validation

## 🔄 Complete Flow Diagram

```
START
  │
  ├─> [1] /forgot-password
  │    │
  │    ├─ กรอก email
  │    ├─ กด "ส่งรหัส OTP"
  │    │
  │    ├─> Backend: POST /auth/send-otp
  │    │    │
  │    │    ├─ สร้าง OTP 6 หลัก
  │    │    ├─ บันทึกใน database
  │    │    ├─ ส่งอีเมล (หรือ log ใน console)
  │    │    └─ Response: "OTP sent"
  │    │
  │    └─> [2] /forgot-password (success state)
  │         │
  │         ├─ แสดงข้อความ "ตรวจสอบอีเมล"
  │         ├─ แสดง email ที่ส่งไป
  │         │
  │         ├─ Option A: คลิก "ไปกรอกรหัส OTP"
  │         │   └─> [3] /verify-otp?email=xxx
  │         │
  │         └─ Option B: คลิก "ส่งรหัส OTP ใหม่"
  │             └─> กลับไป [1]
  │
  └─> [3] /verify-otp?email=xxx
       │
       ├─ กรอก OTP 6 หลัก
       ├─ กรอกรหัสผ่านใหม่
       ├─ กรอกยืนยันรหัสผ่าน
       ├─ กด "ยืนยันและรีเซ็ตรหัสผ่าน"
       │
       ├─> Backend: POST /auth/verify-otp
       │    │
       │    ├─ ตรวจสอบ OTP
       │    ├─ ตรวจสอบเวลาหมดอายุ
       │    ├─ ตรวจสอบจำนวนครั้งที่ลองผิด
       │    ├─ Hash รหัสผ่านใหม่
       │    ├─ อัพเดท password
       │    ├─ ลบ OTP
       │    └─ Response: "Success"
       │
       └─> [4] /login
            │
            └─ เข้าสู่ระบบด้วยรหัสผ่านใหม่
            
END
```

## 📧 Email Flow

```
User กรอก email
     ↓
Backend สร้าง OTP
     ↓
┌─────────────────────────────────────┐
│  Development Mode                   │
│  (EMAIL_USER = your-email@gmail.com)│
├─────────────────────────────────────┤
│  แสดงใน Backend Console:           │
│  ================================   │
│  📧 OTP Email (Development Mode)   │
│  ================================   │
│  To: user@example.com              │
│  OTP Code: 123456                  │
│  Expires in: 10 minutes            │
│  ================================   │
└─────────────────────────────────────┘
     ↓
User คัดลอก OTP จาก console

หรือ

┌─────────────────────────────────────┐
│  Production Mode                    │
│  (EMAIL_USER = your-real-email)     │
├─────────────────────────────────────┤
│  ส่งอีเมลจริงไปที่ user:           │
│                                     │
│  Subject: รหัส OTP สำหรับรีเซ็ต...  │
│                                     │
│  🎮 CYBERPAY                        │
│  รหัส OTP ของคุณคือ                │
│                                     │
│  ┌─────────┐                       │
│  │ 123456  │                       │
│  └─────────┘                       │
│                                     │
│  ⏰ หมดอายุใน 10 นาที              │
│  🔒 อย่าแชร์รหัสนี้                │
└─────────────────────────────────────┘
     ↓
User เปิดอีเมลและดู OTP
```

## 🔒 Security Checks

### ที่หน้า verify-otp:
```
1. ตรวจสอบว่ามี email parameter หรือไม่
   ❌ ไม่มี → Redirect ไป /forgot-password

2. ตรวจสอบว่ากรอก OTP ครบ 6 หลักหรือไม่
   ❌ ไม่ครบ → Disable ปุ่ม submit

3. ตรวจสอบรหัสผ่านตามเงื่อนไข
   ❌ ไม่ผ่าน → Disable ปุ่ม submit

4. ตรวจสอบว่า OTP หมดอายุหรือไม่
   ❌ หมดอายุ → Disable ปุ่ม submit
   ✅ ยังไม่หมด → แสดง countdown

5. ส่งข้อมูลไป Backend
```

### ที่ Backend:
```
1. ตรวจสอบว่า user มีอยู่หรือไม่
   ❌ ไม่มี → Error: "Invalid email or OTP"

2. ตรวจสอบว่ามี OTP หรือไม่
   ❌ ไม่มี → Error: "No OTP found"

3. ตรวจสอบว่า OTP หมดอายุหรือไม่
   ❌ หมดอายุ → Error: "OTP has expired"

4. ตรวจสอบจำนวนครั้งที่ลองผิด
   ❌ ≥ 5 ครั้ง → Error: "Too many failed attempts"

5. ตรวจสอบว่า OTP ถูกต้องหรือไม่
   ❌ ผิด → เพิ่ม attempts + Error: "Invalid OTP"
   ✅ ถูก → อัพเดทรหัสผ่าน + ลบ OTP

6. Success → Redirect ไป /login
```

## 💾 Database State Changes

```
Initial State:
User {
  email: "user@example.com"
  password: "old_hashed_password"
  otpCode: null
  otpExpires: null
  otpAttempts: 0
}

After POST /auth/send-otp:
User {
  email: "user@example.com"
  password: "old_hashed_password"
  otpCode: "123456"                    ← สร้างใหม่
  otpExpires: "2024-02-26T10:10:00Z"   ← +10 นาที
  otpAttempts: 0                       ← reset
}

After Invalid OTP (1st attempt):
User {
  email: "user@example.com"
  password: "old_hashed_password"
  otpCode: "123456"
  otpExpires: "2024-02-26T10:10:00Z"
  otpAttempts: 1                       ← +1
}

After Valid OTP:
User {
  email: "user@example.com"
  password: "new_hashed_password"      ← อัพเดท
  otpCode: null                        ← ลบ
  otpExpires: null                     ← ลบ
  otpAttempts: 0                       ← reset
}
```

## 🎯 Key Features Summary

### หน้า forgot-password:
- ✅ กรอก email
- ✅ ส่ง OTP
- ✅ แสดงหน้า success พร้อมข้อมูล email
- ✅ ปุ่มไปกรอก OTP
- ✅ ปุ่มส่ง OTP ใหม่

### หน้า verify-otp:
- ✅ 6 input boxes สำหรับ OTP
- ✅ Auto-focus และ paste support
- ✅ Countdown timer 10 นาที
- ✅ ปุ่มขอ OTP ใหม่
- ✅ กรอกรหัสผ่านใหม่
- ✅ Password strength indicator
- ✅ Show/hide password
- ✅ Real-time validation

### Backend:
- ✅ สร้าง OTP 6 หลัก
- ✅ ส่งอีเมล (หรือ log ใน console)
- ✅ ตรวจสอบ OTP
- ✅ จำกัดการลองผิด 5 ครั้ง
- ✅ OTP หมดอายุ 10 นาที
- ✅ Hash รหัสผ่านด้วย bcrypt

---

ระบบพร้อมใช้งาน! 🎉

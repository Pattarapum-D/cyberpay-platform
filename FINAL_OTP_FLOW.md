# 🔐 Flow สุดท้าย: ระบบ Forgot Password แบบ OTP (3 หน้าแยกกัน)

## 📱 User Flow (3 หน้าแยกกัน)

```
┌─────────────────────────────────────────────────────────────┐
│                    FLOW DIAGRAM                             │
└─────────────────────────────────────────────────────────────┘

[1] /forgot-password
    │
    ├─ กรอก email
    ├─ กด "ส่งรหัส OTP"
    │
    ├─> Backend: POST /auth/send-otp
    │   └─ สร้าง OTP 6 หลัก + ส่งอีเมล
    │
    └─> [2] /forgot-password (success state)
         │
         ├─ แสดง "ตรวจสอบอีเมล"
         ├─ คลิก "ไปกรอกรหัส OTP"
         │
         └─> [3] /verify-otp?email=xxx
              │
              ├─ กรอก OTP 6 หลัก
              ├─ Countdown timer (10 นาที)
              ├─ กด "ยืนยัน OTP"
              │
              ├─ บันทึก OTP ใน sessionStorage
              │
              └─> [4] /reset-password?email=xxx
                   │
                   ├─ อ่าน OTP จาก sessionStorage
                   ├─ กรอกรหัสผ่านใหม่
                   ├─ กรอกยืนยันรหัสผ่าน
                   ├─ กด "รีเซ็ตรหัสผ่าน"
                   │
                   ├─> Backend: POST /auth/verify-otp
                   │   └─ ตรวจสอบ OTP + อัพเดทรหัสผ่าน
                   │
                   └─> [5] /login
                        └─ เข้าสู่ระบบด้วยรหัสผ่านใหม่
```

## 🎯 หน้าที่ 1: `/forgot-password` - ขอรหัส OTP

### UI:
```
┌─────────────────────────────────┐
│   🎮 CYBERPAY                   │
│   รีเซ็ตรหัสผ่านของคุณ          │
├─────────────────────────────────┤
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

### Actions:
1. กรอก email
2. กดปุ่ม "ส่งรหัส OTP"
3. Backend ส่ง OTP ไปที่อีเมล
4. แสดงหน้า success

### หลังส่ง OTP สำเร็จ:
```
┌─────────────────────────────────┐
│   🎮 CYBERPAY                   │
├─────────────────────────────────┤
│   ตรวจสอบอีเมล                  │
│   เราได้ส่งรหัส OTP ไปยัง       │
│                                 │
│   ┌───────────────────────────┐ │
│   │  📧 user@example.com      │ │
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

## 🎯 หน้าที่ 2: `/verify-otp?email=xxx` - ยืนยัน OTP

### UI:
```
┌─────────────────────────────────┐
│   🎮 CYBERPAY                   │
│   ยืนยันรหัส OTP                │
├─────────────────────────────────┤
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
│   ┌───────────────────────────┐ │
│   │      ยืนยัน OTP           │ │
│   └───────────────────────────┘ │
│                                 │
│   ← กลับไปหน้าลืมรหัสผ่าน       │
└─────────────────────────────────┘
```

### Features:
- ✅ 6 input boxes สำหรับ OTP
- ✅ Auto-focus ระหว่าง input
- ✅ รองรับ paste OTP
- ✅ Countdown timer (10 นาที)
- ✅ ปุ่มขอ OTP ใหม่ (เมื่อหมดเวลา)
- ✅ Backspace navigation

### Actions:
1. กรอก OTP 6 หลัก
2. กดปุ่ม "ยืนยัน OTP"
3. บันทึก OTP + email + timestamp ใน sessionStorage
4. Redirect ไป `/reset-password?email=xxx`

### sessionStorage Data:
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "timestamp": 1708934567890
}
```

## 🎯 หน้าที่ 3: `/reset-password?email=xxx` - ตั้งรหัสผ่านใหม่

### UI:
```
┌─────────────────────────────────┐
│   🎮 CYBERPAY                   │
│   ตั้งรหัสผ่านใหม่              │
├─────────────────────────────────┤
│   รีเซ็ตรหัสผ่าน                │
│   กรอกรหัสผ่านใหม่ของคุณ        │
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
│   │    รีเซ็ตรหัสผ่าน         │ │
│   └───────────────────────────┘ │
│                                 │
│   ยกเลิก                        │
└─────────────────────────────────┘
```

### Features:
- ✅ อ่าน OTP จาก sessionStorage
- ✅ ตรวจสอบว่า OTP ยังไม่หมดอายุ (10 นาที)
- ✅ Password strength indicator
- ✅ Show/hide password
- ✅ Real-time validation
- ✅ Auto redirect ถ้าไม่มี OTP data

### Actions:
1. อ่าน OTP data จาก sessionStorage
2. ตรวจสอบว่า OTP ยังไม่หมดอายุ
3. กรอกรหัสผ่านใหม่
4. กรอกยืนยันรหัสผ่าน
5. กดปุ่ม "รีเซ็ตรหัสผ่าน"
6. ส่ง email + OTP + newPassword ไป Backend
7. ลบ OTP data จาก sessionStorage
8. Redirect ไป `/login`

## 🔄 Data Flow

### 1. ส่ง OTP
```
User Input (email)
     ↓
POST /auth/send-otp
     ↓
Backend:
  - สร้าง OTP 6 หลัก
  - บันทึกใน database
  - ส่งอีเมล
     ↓
Response: "OTP sent"
     ↓
Frontend: แสดงหน้า success
```

### 2. ยืนยัน OTP
```
User Input (OTP 6 หลัก)
     ↓
Frontend:
  - บันทึกใน sessionStorage
  - Redirect ไป /reset-password
     ↓
sessionStorage: {
  email, otp, timestamp
}
```

### 3. รีเซ็ตรหัสผ่าน
```
User Input (password, confirmPassword)
     ↓
Frontend:
  - อ่าน OTP จาก sessionStorage
  - ตรวจสอบเวลาหมดอายุ
     ↓
POST /auth/verify-otp {
  email, otp, newPassword
}
     ↓
Backend:
  - ตรวจสอบ OTP
  - ตรวจสอบเวลาหมดอายุ
  - ตรวจสอบจำนวนครั้งที่ลองผิด
  - Hash รหัสผ่านใหม่
  - อัพเดท password
  - ลบ OTP
     ↓
Response: "Success"
     ↓
Frontend:
  - ลบ sessionStorage
  - Redirect ไป /login
```

## 🔒 Security Features

### 1. OTP Expiration (10 นาที)
- ตรวจสอบที่ Frontend (countdown timer)
- ตรวจสอบที่ Backend (database timestamp)
- ตรวจสอบที่ reset-password page (sessionStorage timestamp)

### 2. Rate Limiting
- จำกัดการลองผิด 5 ครั้ง
- ต้องขอ OTP ใหม่หลังครบ 5 ครั้ง

### 3. sessionStorage Security
- เก็บ OTP ชั่วคราวเท่านั้น
- ตรวจสอบเวลาหมดอายุก่อนใช้
- ลบทันทีหลังใช้งานสำเร็จ
- ลบถ้า OTP หมดอายุ

### 4. Email Privacy
- ไม่เปิดเผยว่า email มีในระบบหรือไม่
- Response เหมือนกันทุกกรณี

### 5. Password Requirements
- อย่างน้อย 8 ตัวอักษร
- มีตัวพิมพ์ใหญ่ (A-Z)
- มีตัวพิมพ์เล็ก (a-z)
- มีตัวเลข (0-9)
- มีอักขระพิเศษ (!@#$%^&*)

## 📊 State Management

### Frontend States:

**forgot-password:**
- `email`: string
- `isLoading`: boolean
- `sent`: boolean

**verify-otp:**
- `otp`: string[] (6 digits)
- `isLoading`: boolean
- `countdown`: number (600 seconds)
- `canResend`: boolean

**reset-password:**
- `password`: string
- `confirmPassword`: string
- `showPassword`: boolean
- `showConfirmPassword`: boolean
- `isLoading`: boolean
- `otpData`: { email, otp, timestamp } | null

### Backend States (Database):

```typescript
User {
  otpCode: string | null        // "123456"
  otpExpires: DateTime | null   // 10 minutes from now
  otpAttempts: number           // 0-5
}
```

## 🧪 Testing Scenarios

### ✅ Happy Path
1. กรอก email → ได้รับ OTP
2. กรอก OTP → ไปหน้า reset-password
3. ตั้งรหัสผ่านใหม่ → สำเร็จ
4. เข้าสู่ระบบ → สำเร็จ

### ❌ Error Cases

**1. ไม่มี email parameter**
- verify-otp: Redirect → /forgot-password
- reset-password: Redirect → /forgot-password

**2. ไม่มี OTP data ใน sessionStorage**
- reset-password: Redirect → /forgot-password

**3. OTP หมดอายุ (Frontend)**
- verify-otp: แสดง "รหัส OTP หมดอายุแล้ว"
- Disable ปุ่ม submit
- แสดงปุ่ม "ส่งรหัส OTP ใหม่"

**4. OTP หมดอายุ (sessionStorage)**
- reset-password: Toast error + Redirect → /forgot-password

**5. OTP ผิด (Backend)**
- Error: "Invalid OTP"
- เพิ่ม otpAttempts
- ถ้าครบ 5 ครั้ง: "Too many failed attempts"

**6. รหัสผ่านไม่ตรงตามเงื่อนไข**
- แสดง password requirements
- Disable ปุ่ม submit

## 💡 Key Differences from Previous Version

### เดิม (2 หน้า):
```
/forgot-password → /verify-otp (กรอก OTP + รหัสผ่าน)
```

### ใหม่ (3 หน้า):
```
/forgot-password → /verify-otp (กรอก OTP) → /reset-password (กรอกรหัสผ่าน)
```

### ข้อดี:
- ✅ แยก concerns ชัดเจน
- ✅ UX ดีขึ้น (ทำทีละขั้นตอน)
- ✅ ใช้ sessionStorage แทน URL parameter
- ✅ ตรวจสอบเวลาหมดอายุหลายชั้น
- ✅ สามารถกลับไปแก้ไข OTP ได้

## 🚀 Production Checklist

- [ ] ตั้งค่า email service จริง
- [ ] ตั้งค่า rate limiting ที่ API level
- [ ] เพิ่ม CAPTCHA ถ้าจำเป็น
- [ ] ตั้งค่า monitoring และ logging
- [ ] ทดสอบ email delivery
- [ ] ตรวจสอบ spam score
- [ ] ทดสอบ sessionStorage ใน incognito mode
- [ ] ทดสอบ multiple tabs
- [ ] ทดสอบ browser back button
- [ ] ทดสอบ expired OTP scenarios

---

ระบบพร้อมใช้งาน! 🎉

แยกหน้าชัดเจน 3 หน้า:
1. forgot-password - ขอ OTP
2. verify-otp - ยืนยัน OTP
3. reset-password - ตั้งรหัสผ่านใหม่

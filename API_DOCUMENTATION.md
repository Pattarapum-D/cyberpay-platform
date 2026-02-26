# API Documentation - CYBERPAY

เอกสารนี้รวบรวม API endpoints ทั้งหมดที่ใช้ในระบบ CYBERPAY

## Base URL
```
http://localhost:3001
```

## Authentication
API ส่วนใหญ่ใช้ JWT (JSON Web Token) สำหรับการยืนยันตัวตน

### Header Format
```
Authorization: Bearer <token>
```

---

## 📋 API Endpoints

### 1. Authentication APIs

#### 1.1 Register (สมัครสมาชิก)
สร้างบัญชีผู้ใช้ใหม่

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username" // optional
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "profile": {
      "username": "username",
      "display_name": "username"
    }
  }
}
```

**Response (Error - 400):**
```json
{
  "message": "User already exists"
}
```

---

#### 1.2 Login (เข้าสู่ระบบ)
เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "profile": {
      "username": "username",
      "display_name": "username",
      "avatar_url": "https://..."
    }
  }
}
```

**Response (Error - 400):**
```json
{
  "message": "Invalid credentials"
}
```

---

#### 1.3 Get Current User (ดึงข้อมูลผู้ใช้ปัจจุบัน)
ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "profile": {
      "username": "username",
      "display_name": "username",
      "avatar_url": "https://..."
    }
  }
}
```

**Response (Error - 401):**
```json
{
  "message": "No token provided"
}
```

---

### 2. Password Reset APIs

#### 2.1 Forgot Password (ขอรีเซ็ตรหัสผ่าน)
ส่ง OTP ไปยังอีเมลเพื่อรีเซ็ตรหัสผ่าน

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "ส่งรหัส OTP ไปยังอีเมลแล้ว"
}
```

**Response (Error - 404):**
```json
{
  "message": "ไม่พบอีเมลนี้ในระบบ"
}
```

**Note:** OTP จะแสดงใน console (Mock Email Service)
```
🔔 ===== MOCK EMAIL SERVICE =====
📧 To: user@example.com
📋 Subject: รีเซ็ตรหัสผ่าน - CYBERPAY
🔑 OTP Code: 123456
⏰ Expires: 10 minutes
================================
```

---

#### 2.2 Verify Reset OTP (ยืนยัน OTP)
ตรวจสอบ OTP และรับ reset token

**Endpoint:** `POST /api/auth/verify-reset-otp`

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "resetToken": "abc123def456...",
  "message": "ยืนยัน OTP สำเร็จ"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "รหัส OTP ไม่ถูกต้องหรือหมดอายุแล้ว"
}
```

---

#### 2.3 Reset Password (เปลี่ยนรหัสผ่าน)
เปลี่ยนรหัสผ่านใหม่ด้วย reset token

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**
```json
{
  "resetToken": "abc123def456...",
  "newPassword": "newpassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "เปลี่ยนรหัสผ่านสำเร็จ"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Token ไม่ถูกต้องหรือหมดอายุแล้ว"
}
```

---

#### 2.4 Verify Reset Token (ตรวจสอบ Token)
ตรวจสอบว่า reset token ยังใช้งานได้หรือไม่

**Endpoint:** `GET /api/auth/verify-reset-token/:token`

**URL Parameters:**
- `token`: Reset token ที่ได้จาก verify OTP

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Token ถูกต้อง",
  "email": "user@example.com"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Token ไม่ถูกต้องหรือหมดอายุแล้ว"
}
```

---

### 3. Google OAuth APIs

#### 3.1 Google OAuth - Initiate (เริ่มต้น Google Login)
รับ URL สำหรับ redirect ไป Google OAuth

**Endpoint:** `GET /api/auth/google`

**Response (Success - 200):**
```json
{
  "success": true,
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

**การใช้งาน:**
1. เรียก API นี้เพื่อรับ `authUrl`
2. Redirect ผู้ใช้ไปยัง `authUrl`
3. Google จะ redirect กลับมาที่ callback URL

---

#### 3.2 Google OAuth - Callback
รับ callback จาก Google และสร้าง JWT token

**Endpoint:** `GET /auth/google/callback`

**Query Parameters:**
- `code`: Authorization code จาก Google

**Response:**
- Redirect ไปยัง: `${FRONTEND_URL}/auth/google/callback?token=<jwt_token>`
- หรือ Error: `${FRONTEND_URL}/login?error=auth_failed`

**การทำงาน:**
1. รับ code จาก Google
2. แลกเปลี่ยน code เป็น access token
3. ดึงข้อมูลผู้ใช้จาก Google
4. สร้างหรืออัพเดท user ในฐานข้อมูล
5. สร้าง JWT token
6. Redirect กลับไปหน้า frontend พร้อม token

---

### 4. Facebook OAuth APIs

#### 4.1 Facebook OAuth - Initiate (เริ่มต้น Facebook Login)
รับ URL สำหรับ redirect ไป Facebook OAuth

**Endpoint:** `GET /api/auth/facebook`

**Response (Success - 200):**
```json
{
  "success": true,
  "authUrl": "https://www.facebook.com/v18.0/dialog/oauth?..."
}
```

**การใช้งาน:**
1. เรียก API นี้เพื่อรับ `authUrl`
2. Redirect ผู้ใช้ไปยัง `authUrl`
3. Facebook จะ redirect กลับมาที่ callback URL

---

#### 4.2 Facebook OAuth - Callback
รับ callback จาก Facebook และสร้าง JWT token

**Endpoint:** `GET /auth/facebook/callback`

**Query Parameters:**
- `code`: Authorization code จาก Facebook

**Response:**
- Redirect ไปยัง: `${FRONTEND_URL}/auth/facebook/callback?token=<jwt_token>`
- หรือ Error: `${FRONTEND_URL}/login?error=auth_failed`

**การทำงาน:**
1. รับ code จาก Facebook
2. แลกเปลี่ยน code เป็น access token
3. ดึงข้อมูลผู้ใช้จาก Facebook
4. สร้างหรืออัพเดท user ในฐานข้อมูล
5. สร้าง JWT token
6. Redirect กลับไปหน้า frontend พร้อม token

---

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String,              // required, unique, lowercase
  password: String,           // required, minlength: 6, hashed
  profile: {
    username: String,
    display_name: String,
    avatar_url: String
  },
  googleId: String,           // unique, sparse
  facebookId: String,         // unique, sparse
  resetPasswordOTP: String,
  resetPasswordExpires: Date,
  resetPasswordToken: String,
  isEmailVerified: Boolean,   // default: false
  emailVerificationOTP: String,
  emailVerificationExpires: Date,
  createdAt: Date,            // auto-generated
  updatedAt: Date             // auto-generated
}
```

---

## 🔐 Security Features

### Password Hashing
- ใช้ bcrypt สำหรับ hash password
- Salt rounds: 12
- Hash อัตโนมัติก่อน save ด้วย pre-save middleware

### JWT Token
- Algorithm: HS256
- Expiration: 7 days
- Secret: จาก environment variable `JWT_SECRET`

### OTP System
- 6 หลัก (100000-999999)
- หมดอายุใน 10 นาที
- ใช้ครั้งเดียว (clear หลังใช้งาน)

---

## 🌐 Environment Variables

```env
# Server
PORT=3001
MONGODB_URI=mongodb://localhost:27017/cyberpay

# JWT
JWT_SECRET=your_jwt_secret_key

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3001/auth/google/callback

# Facebook OAuth
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_REDIRECT_URI=http://localhost:3001/auth/facebook/callback
```

---

## 📝 Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (Invalid input) |
| 401 | Unauthorized (Invalid/Missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🧪 Testing

### ทดสอบด้วย cURL

**Register:**
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"testuser"}'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Get Current User:**
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Forgot Password:**
```bash
curl -X POST http://localhost:3001/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## 📌 Notes

1. **Email Service**: ปัจจุบันใช้ Mock Email Service ที่แสดง OTP ใน console แทนการส่งอีเมลจริง
2. **OAuth Redirect**: ต้องตั้งค่า redirect URI ใน Google/Facebook Console ให้ตรงกับ environment variables
3. **CORS**: Server เปิด CORS สำหรับทุก origin (ควรจำกัดใน production)
4. **Token Expiration**: JWT token หมดอายุใน 7 วัน
5. **OTP Expiration**: OTP หมดอายุใน 10 นาที

---

## 🔄 API Flow Diagrams

### Password Reset Flow
```
1. User → POST /forgot-password → Server
2. Server → Generate OTP → Save to DB
3. Server → Send OTP (Mock Email) → Console
4. User → POST /verify-reset-otp → Server
5. Server → Verify OTP → Return resetToken
6. User → POST /reset-password → Server
7. Server → Update Password → Success
```

### OAuth Flow (Google/Facebook)
```
1. User → GET /auth/google → Server
2. Server → Return authUrl → User
3. User → Redirect to Google → Google
4. Google → Authenticate → Redirect with code
5. Server → GET /auth/google/callback → Exchange code
6. Server → Get user info → Create/Update user
7. Server → Generate JWT → Redirect to frontend
```

---

สร้างเมื่อ: 19 กุมภาพันธ์ 2026

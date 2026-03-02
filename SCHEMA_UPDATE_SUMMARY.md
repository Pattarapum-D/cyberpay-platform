# Schema Update Summary

## วันที่: 27 กุมภาพันธ์ 2026

## การเปลี่ยนแปลง Database Schema

### 1. User Model
**เปลี่ยนแปลง:**
- `id`: String (uuid) → BigInt (autoincrement)
- เพิ่ม `uuid`: String (CHAR(36)) - unique identifier
- `password` → `password_hash`: VARCHAR(255)
- เพิ่ม `tier`: VARCHAR(50) - ระดับผู้ใช้
- เพิ่ม `point_balance`: Int - คะแนนสะสม
- เพิ่ม `wallet_balance`: DECIMAL(12,2) - ยอดเงินในกระเป๋า
- เพิ่ม `role`: VARCHAR(20) - บทบาท (user, admin)
- `createdAt` → `created_at`: TIMESTAMP
- `updatedAt` → `updated_at`: TIMESTAMP
- เพิ่ม `last_login_at`: TIMESTAMP - เวลา login ล่าสุด
- ลบ `avatar` - ไม่จำเป็นสำหรับระบบ topup

**เก็บไว้เพื่อ backward compatibility:**
- OAuth fields: name, provider, providerId
- System fields: resetPasswordToken, resetPasswordExpires, otpCode, otpExpires, otpAttempts
- VIP system: vipLevel, vipPoints
- balance (เดิม)

### 2. ตารางใหม่: PasswordReset
```prisma
model PasswordReset {
  id            BigInt
  user_id       BigInt
  token_hash    VARCHAR(255)
  expires_at    TIMESTAMP
  used_at       TIMESTAMP
  ip_address    VARCHAR(45)
  created_at    TIMESTAMP
}
```

### 3. ตารางใหม่: OtpRequest
```prisma
model OtpRequest {
  id            BigInt
  user_id       BigInt
  otp_hash      VARCHAR(255)
  expires_at    TIMESTAMP
  attempt_count Int
  ip_address    VARCHAR(45)
  created_at    TIMESTAMP
}
```

### 4. Order & Transaction Models
- `userId`: String → BigInt (เชื่อมกับ User.id ใหม่)

## การเปลี่ยนแปลง Code

### Backend Services Updated:
1. **users.service.ts**
   - `findById(id: bigint)`
   - `update(id: bigint, ...)`
   - `delete(id: bigint)`

2. **auth.service.ts**
   - เปลี่ยน `password` → `password_hash` ทุกที่
   - `generateToken()` แปลง BigInt → string
   - ลบ `avatar` จาก OAuth registration
   - `sanitizeUser()` ซ่อน `password_hash`

3. **jwt.strategy.ts**
   - แปลง `payload.sub` เป็น BigInt

4. **users.controller.ts**
   - ซ่อน `password_hash` แทน `password`

5. **orders.service.ts**
   - `findAll(userId: bigint)`

6. **prisma.service.ts**
   - ลบ `passwordReset: any` ที่ไม่จำเป็น

## Migration
```bash
npx prisma migrate dev --name update_schema_structure
```

## การทดสอบ
✅ Build สำเร็จ: `npm run build`
✅ Migration สำเร็จ
✅ Prisma Client regenerated

## ขั้นตอนต่อไป (ถ้าต้องการ)
1. อัพเดท frontend API calls ให้รองรับ field names ใหม่
2. ทดสอบ authentication flow
3. ทดสอบ password reset & OTP flow
4. พิจารณาใช้ PasswordReset และ OtpRequest tables แทน fields ใน User
5. เพิ่ม API endpoints สำหรับ tier, role, point_balance, wallet_balance

## หมายเหตุ
- ระบบยังคงใช้ fields เดิมใน User model เพื่อ backward compatibility
- ตาราง PasswordReset และ OtpRequest ถูกสร้างแล้ว แต่ยังไม่ได้ใช้งาน
- ควรค่อยๆ migrate logic ไปใช้ตารางใหม่ในอนาคต

# 🐘 คู่มือการใช้งาน pgAdmin

pgAdmin คือเครื่องมือจัดการ PostgreSQL แบบ GUI ที่ใช้งานง่าย

## 📥 การติดตั้ง pgAdmin

### Windows:
1. ดาวน์โหลดจาก: https://www.pgadmin.org/download/pgadmin-4-windows/
2. รันไฟล์ติดตั้ง
3. เปิด pgAdmin จาก Start Menu

### macOS:
```bash
brew install --cask pgadmin4
```

### Linux:
```bash
# Ubuntu/Debian
sudo apt install pgadmin4
```

## 🔌 การเชื่อมต่อกับ Database

### ข้อมูลจาก backend/.env ของคุณ:
```env
DATABASE_URL="postgresql://postgres:glglome053@localhost:5432/game_topup_db?schema=public"
```

แยกข้อมูล:
- **Host**: localhost
- **Port**: 5432
- **Database**: game_topup_db
- **Username**: postgres
- **Password**: glglome053

### ขั้นตอนการเชื่อมต่อ:

#### 1. เปิด pgAdmin
- เปิดโปรแกรม pgAdmin
- จะเปิดในเบราว์เซอร์ (http://localhost:5050 หรือ http://127.0.0.1:5050)
- ตั้งรหัส Master Password (ครั้งแรกเท่านั้น)

#### 2. สร้าง Server Connection
```
1. คลิกขวาที่ "Servers" ในแถบซ้าย
2. เลือก "Register" → "Server..."
```

#### 3. กรอกข้อมูล Connection

**Tab: General**
```
Name: Game Topup DB (ตั้งชื่ออะไรก็ได้)
```

**Tab: Connection**
```
Host name/address: localhost
Port: 5432
Maintenance database: postgres
Username: postgres
Password: glglome053
☑ Save password
```

**Tab: Advanced** (Optional)
```
DB restriction: game_topup_db
```

#### 4. คลิก "Save"

## 📊 การดูข้อมูลในตาราง

### เปิดดู Database:
```
Servers
  └─ Game Topup DB
      └─ Databases
          └─ game_topup_db
              └─ Schemas
                  └─ public
                      └─ Tables
```

### ตารางที่มีในโปรเจคของคุณ:
- **User** - ข้อมูลผู้ใช้
- **Order** - ข้อมูลคำสั่งซื้อ
- **Transaction** - ประวัติการทำธุรกรรม
- **Game** - ข้อมูลเกม
- **GamePackage** - แพ็คเกจเกม
- **_prisma_migrations** - ประวัติ migration

### วิธีดูข้อมูล:

#### วิธีที่ 1: View Data
```
1. คลิกขวาที่ตาราง เช่น "User"
2. เลือก "View/Edit Data" → "All Rows"
3. จะแสดงข้อมูลทั้งหมดในตาราง
```

#### วิธีที่ 2: Query Tool
```
1. คลิกขวาที่ "game_topup_db"
2. เลือก "Query Tool"
3. พิมพ์ SQL query
4. กด F5 หรือคลิกปุ่ม ▶ (Execute)
```

## 🔍 SQL Queries ที่มีประโยชน์

### 1. ดูผู้ใช้ทั้งหมด
```sql
SELECT * FROM "User";
```

### 2. ดูผู้ใช้ที่มี OTP
```sql
SELECT 
  email, 
  "otpCode", 
  "otpExpires", 
  "otpAttempts"
FROM "User"
WHERE "otpCode" IS NOT NULL;
```

### 3. ดูผู้ใช้ที่ลงทะเบียนวันนี้
```sql
SELECT 
  email, 
  name, 
  "createdAt"
FROM "User"
WHERE DATE("createdAt") = CURRENT_DATE;
```

### 4. นับจำนวนผู้ใช้แต่ละ provider
```sql
SELECT 
  provider, 
  COUNT(*) as count
FROM "User"
GROUP BY provider;
```

### 5. ดูคำสั่งซื้อล่าสุด 10 รายการ
```sql
SELECT 
  o.id,
  u.email,
  o."gameName",
  o."packageName",
  o."packagePrice",
  o.status,
  o."createdAt"
FROM "Order" o
JOIN "User" u ON o."userId" = u.id
ORDER BY o."createdAt" DESC
LIMIT 10;
```

### 6. ดูยอดเงินรวมของผู้ใช้
```sql
SELECT 
  email,
  balance,
  "vipLevel",
  "vipPoints"
FROM "User"
WHERE balance > 0
ORDER BY balance DESC;
```

### 7. ลบ OTP ที่หมดอายุ
```sql
UPDATE "User"
SET 
  "otpCode" = NULL,
  "otpExpires" = NULL,
  "otpAttempts" = 0
WHERE "otpExpires" < NOW();
```

### 8. ดูสถิติการใช้งาน
```sql
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN provider = 'local' THEN 1 END) as local_users,
  COUNT(CASE WHEN provider = 'google' THEN 1 END) as google_users,
  COUNT(CASE WHEN provider = 'facebook' THEN 1 END) as facebook_users,
  COUNT(CASE WHEN "isEmailVerified" = true THEN 1 END) as verified_users
FROM "User";
```

## 🛠️ การจัดการข้อมูล

### เพิ่มข้อมูล (INSERT)
```sql
INSERT INTO "User" (
  id, 
  email, 
  name, 
  provider
) VALUES (
  gen_random_uuid(),
  'test@example.com',
  'Test User',
  'local'
);
```

### แก้ไขข้อมูล (UPDATE)
```sql
UPDATE "User"
SET 
  name = 'New Name',
  "vipLevel" = 1
WHERE email = 'test@example.com';
```

### ลบข้อมูล (DELETE)
```sql
DELETE FROM "User"
WHERE email = 'test@example.com';
```

### ⚠️ คำเตือน:
- ใช้ WHERE clause เสมอเมื่อ UPDATE หรือ DELETE
- ทดสอบ SELECT ก่อนรัน UPDATE/DELETE
- สำรองข้อมูลก่อนทำการแก้ไขครั้งใหญ่

## 🔧 ฟีเจอร์ที่มีประโยชน์

### 1. Export Data
```
1. คลิกขวาที่ตาราง
2. เลือก "Import/Export Data..."
3. เลือก "Export"
4. เลือกรูปแบบ (CSV, JSON, etc.)
5. คลิก "OK"
```

### 2. Import Data
```
1. คลิกขวาที่ตาราง
2. เลือก "Import/Export Data..."
3. เลือก "Import"
4. เลือกไฟล์
5. ตั้งค่า columns
6. คลิก "OK"
```

### 3. Backup Database
```
1. คลิกขวาที่ "game_topup_db"
2. เลือก "Backup..."
3. ตั้งชื่อไฟล์
4. เลือก Format: "Custom" หรือ "Plain"
5. คลิก "Backup"
```

### 4. Restore Database
```
1. คลิกขวาที่ "game_topup_db"
2. เลือก "Restore..."
3. เลือกไฟล์ backup
4. คลิก "Restore"
```

### 5. ดู Table Structure
```
1. คลิกที่ตาราง
2. ดูแท็บ "Columns" - ดู columns และ data types
3. ดูแท็บ "Constraints" - ดู primary keys, foreign keys
4. ดูแท็บ "Indexes" - ดู indexes
```

## 📈 Dashboard และ Monitoring

### 1. Server Activity
```
1. คลิกที่ "Game Topup DB"
2. เลือกแท็บ "Dashboard"
3. ดู:
   - Server Activity
   - Database Statistics
   - Active Sessions
```

### 2. Query History
```
Tools → Query History
- ดู queries ที่รันไปแล้ว
- Copy queries
- Re-run queries
```

### 3. Explain Query
```
1. เปิด Query Tool
2. พิมพ์ query
3. คลิก "Explain" (F7)
4. ดู execution plan
```

## 🐛 Troubleshooting

### ปัญหา: เชื่อมต่อไม่ได้

**ตรวจสอบ:**
1. PostgreSQL service รันอยู่หรือไม่
```bash
# Windows
services.msc → ค้นหา "postgresql"

# macOS/Linux
sudo systemctl status postgresql
```

2. ตรวจสอบ port 5432
```bash
netstat -an | findstr 5432
```

3. ตรวจสอบ username/password
```bash
psql -U postgres -d game_topup_db
```

### ปัญหา: ไม่เห็นตาราง

**แก้ไข:**
1. Refresh: คลิกขวาที่ "Tables" → "Refresh"
2. ตรวจสอบ schema: ดูใน "public" schema
3. รัน migration:
```bash
cd backend
npx prisma migrate dev
```

### ปัญหา: Permission denied

**แก้ไข:**
```sql
-- ให้สิทธิ์ทั้งหมดกับ user
GRANT ALL PRIVILEGES ON DATABASE game_topup_db TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
```

## 💡 Tips & Tricks

### 1. Keyboard Shortcuts
```
F5          - Execute query
F7          - Explain query
F8          - Execute explain analyze
Ctrl+Space  - Auto-complete
Ctrl+Shift+C - Comment/Uncomment
Ctrl+/      - Toggle comment
```

### 2. Query Snippets
```
1. Tools → Preferences → Query Tool → Macros
2. สร้าง macros สำหรับ queries ที่ใช้บ่อย
```

### 3. Multiple Query Windows
```
Ctrl+T - เปิด Query Tool ใหม่
```

### 4. Format SQL
```
1. เลือก SQL code
2. คลิกขวา → "Format SQL"
```

### 5. Filter Data
```
1. View/Edit Data
2. คลิกที่ filter icon (🔍)
3. ตั้งเงื่อนไข
```

## 📚 Queries สำหรับ Development

### ล้างข้อมูล OTP ทั้งหมด
```sql
UPDATE "User"
SET 
  "otpCode" = NULL,
  "otpExpires" = NULL,
  "otpAttempts" = 0;
```

### สร้าง Test User
```sql
INSERT INTO "User" (
  id,
  email,
  password,
  name,
  provider,
  "isEmailVerified"
) VALUES (
  gen_random_uuid(),
  'test@example.com',
  '$2a$10$YourHashedPasswordHere',
  'Test User',
  'local',
  true
);
```

### ดูข้อมูล Migration
```sql
SELECT * FROM "_prisma_migrations"
ORDER BY "finished_at" DESC;
```

### Reset Auto-increment (ถ้ามี)
```sql
-- ไม่จำเป็นสำหรับ UUID
-- แต่ถ้าใช้ SERIAL:
ALTER SEQUENCE user_id_seq RESTART WITH 1;
```

## 🎯 Best Practices

1. **ใช้ Transactions สำหรับการแก้ไขข้อมูลหลายตาราง**
```sql
BEGIN;
UPDATE "User" SET balance = balance - 100 WHERE id = 'user-id';
INSERT INTO "Transaction" (...) VALUES (...);
COMMIT;
-- หรือ ROLLBACK; ถ้าเกิด error
```

2. **สำรองข้อมูลก่อนทำการแก้ไขครั้งใหญ่**

3. **ใช้ WHERE clause เสมอ**

4. **ทดสอบ SELECT ก่อน UPDATE/DELETE**

5. **ใช้ LIMIT เมื่อดูข้อมูลจำนวนมาก**

---

## 🚀 Quick Start

1. เปิด pgAdmin
2. Register Server (ใช้ข้อมูลจาก backend/.env)
3. เปิด Query Tool
4. ทดสอบ query:
```sql
SELECT * FROM "User" LIMIT 5;
```

ใช้งานได้เลย! 🎉

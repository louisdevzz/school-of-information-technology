# SIT Backend API

Backend API cho hệ thống quản lý thông tin sinh viên với tính năng dịch thuật OpenAI.

## 🚀 Tính năng chính

- **Quản lý song ngữ**: Hỗ trợ tiếng Việt và tiếng Anh
- **Dịch thuật OpenAI**: Tự động dịch nội dung từ tiếng Việt sang tiếng Anh
- **Theo dõi trạng thái dịch thuật**: Pending → Translated → Reviewed → Approved
- **API RESTful**: Thiết kế API chuẩn REST
- **Validation**: Kiểm tra dữ liệu đầu vào
- **Pagination**: Hỗ trợ phân trang

## 📋 Cấu trúc Database

### Bảng chính
- `education_levels` - Cấp độ đào tạo (Đại học, Sau đại học)
- `majors` - Ngành học (Khoa học Máy tính, Khoa học Dữ liệu, AI)
- `programs` - Chương trình đào tạo
- `courses_vi/en` - Môn học (tiếng Việt/Anh)
- `program_structures_vi/en` - Cấu trúc chương trình
- `translation_jobs` - Công việc dịch thuật

### Thiết kế tách biệt ngôn ngữ
Mỗi entity có 2 bảng:
- `*_vi`: Nội dung tiếng Việt (nguồn gốc)
- `*_en`: Nội dung tiếng Anh (được dịch từ tiếng Việt)

## 🛠️ Cài đặt

### Yêu cầu
- Node.js 18+
- PostgreSQL
- OpenAI API Key

### Cài đặt dependencies
```bash
pnpm install
```

### Cấu hình môi trường
Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

Cập nhật các biến môi trường:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

### Chạy migrations
```bash
npx drizzle-kit push
```

### Chạy ứng dụng
```bash
# Development
pnpm start:dev

# Production
pnpm build
pnpm start:prod
```

## 📚 API Endpoints

### 🏠 Root
- `GET /api` - Thông tin API
- `GET /api/health` - Health check

### 🎓 Education Levels
- `GET /api/education-levels` - Lấy danh sách cấp độ đào tạo
- `POST /api/education-levels` - Tạo cấp độ đào tạo
- `GET /api/education-levels/:id` - Lấy chi tiết cấp độ đào tạo
- `PUT /api/education-levels/:id` - Cập nhật cấp độ đào tạo
- `POST /api/education-levels/:id/vietnamese` - Thêm nội dung tiếng Việt
- `POST /api/education-levels/:id/english` - Thêm nội dung tiếng Anh
- `DELETE /api/education-levels/:id` - Xóa cấp độ đào tạo

### 📚 Majors
- `GET /api/majors` - Lấy danh sách ngành học
- `POST /api/majors` - Tạo ngành học
- `GET /api/majors/:id` - Lấy chi tiết ngành học
- `PUT /api/majors/:id` - Cập nhật ngành học
- `POST /api/majors/:id/vietnamese` - Thêm nội dung tiếng Việt
- `POST /api/majors/:id/english` - Thêm nội dung tiếng Anh
- `DELETE /api/majors/:id` - Xóa ngành học

### 🎯 Programs
- `GET /api/programs` - Lấy danh sách chương trình
- `POST /api/programs` - Tạo chương trình
- `GET /api/programs/:id` - Lấy chi tiết chương trình
- `GET /api/programs/major/:majorId` - Lấy chương trình theo ngành
- `PUT /api/programs/:id` - Cập nhật chương trình
- `POST /api/programs/:id/vietnamese` - Thêm nội dung tiếng Việt
- `POST /api/programs/:id/english` - Thêm nội dung tiếng Anh
- `DELETE /api/programs/:id` - Xóa chương trình

### 📖 Courses
- `GET /api/courses` - Lấy danh sách môn học
- `POST /api/courses/vietnamese` - Tạo môn học tiếng Việt
- `POST /api/courses/english` - Tạo môn học tiếng Anh
- `GET /api/courses/:code` - Lấy chi tiết môn học theo mã
- `PUT /api/courses/:code/vietnamese` - Cập nhật môn học tiếng Việt
- `PUT /api/courses/:code/english` - Cập nhật môn học tiếng Anh
- `DELETE /api/courses/:code` - Xóa môn học

### 🏗️ Program Structures
- `GET /api/program-structures/program/:programId` - Lấy cấu trúc chương trình
- `POST /api/program-structures/vietnamese` - Tạo cấu trúc tiếng Việt
- `POST /api/program-structures/english` - Tạo cấu trúc tiếng Anh
- `GET /api/program-structures/program/:programId/order/:order` - Lấy chi tiết cấu trúc
- `PUT /api/program-structures/program/:programId/order/:order/vietnamese` - Cập nhật tiếng Việt
- `PUT /api/program-structures/program/:programId/order/:order/english` - Cập nhật tiếng Anh
- `DELETE /api/program-structures/program/:programId/order/:order` - Xóa cấu trúc

### 🔄 Translation
- `GET /api/translation/jobs` - Lấy danh sách công việc dịch thuật
- `POST /api/translation/jobs` - Tạo công việc dịch thuật
- `POST /api/translation/process/:jobId` - Xử lý dịch thuật
- `POST /api/translation/batch` - Dịch hàng loạt
- `POST /api/translation/translate-text` - Dịch văn bản trực tiếp
- `PUT /api/translation/jobs/:jobId/status` - Cập nhật trạng thái dịch thuật

## 📝 Ví dụ sử dụng

### Tạo Education Level
```bash
# Tạo cấp độ đào tạo cơ bản
curl -X POST http://localhost:3000/api/education-levels \
  -H "Content-Type: application/json" \
  -d '{
    "level": "undergraduate",
    "order": 1
  }'

# Thêm nội dung tiếng Việt
curl -X POST http://localhost:3000/api/education-levels/1/vietnamese \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Đại học",
    "description": "Chương trình đào tạo đại học"
  }'

# Thêm nội dung tiếng Anh
curl -X POST http://localhost:3000/api/education-levels/1/english \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Undergraduate",
    "description": "Undergraduate degree program"
  }'
```

### Dịch thuật với OpenAI
```bash
# Dịch văn bản trực tiếp
curl -X POST http://localhost:3000/api/translation/translate-text \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Khoa học Máy tính là ngành học về thiết kế và phát triển phần mềm",
    "context": "Major description"
  }'
```

## 🔧 Development

### Chạy tests
```bash
pnpm test
pnpm test:e2e
```

### Linting
```bash
pnpm lint
pnpm format
```

### Database migrations
```bash
# Generate migration
npx drizzle-kit generate

# Push to database
npx drizzle-kit push

# Pull from database
npx drizzle-kit pull
```

## 📊 Response Format

Tất cả API responses đều có format chuẩn:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🚨 Error Handling

API sử dụng HTTP status codes chuẩn:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## 📄 License

MIT License
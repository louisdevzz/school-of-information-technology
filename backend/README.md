# 🔧 Backend - School of Information Technology

<div align="center">

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.44.6-orange?style=for-the-badge)](https://orm.drizzle.team/)

**Backend API cho hệ thống quản lý Khoa Công nghệ Thông tin**

*RESTful API với NestJS, PostgreSQL và Drizzle ORM*

</div>

---

## 📋 Mục lục

- [🎯 Giới thiệu](#-giới-thiệu)
- [✨ Tính năng](#-tính-năng)
- [🛠 Công nghệ](#-công-nghệ)
- [🚀 Cài đặt](#-cài-đặt)
- [📁 Cấu trúc](#-cấu-trúc)
- [🗄️ Database](#️-database)
- [🌐 API Endpoints](#-api-endpoints)
- [🔄 Translation](#-translation)
- [🧪 Testing](#-testing)
- [📞 Liên hệ](#-liên-hệ)

---

## 🎯 Giới thiệu

Backend API cho hệ thống quản lý thông tin sinh viên và chương trình đào tạo của Khoa Công nghệ Thông tin - Đại học Tân Tạo. Được xây dựng với NestJS, PostgreSQL và Drizzle ORM, hỗ trợ đa ngôn ngữ và tích hợp OpenAI cho dịch thuật.

> 📖 **Xem README tổng thể tại** [../README.md](../README.md)

## ✨ Tính năng

- 🔌 **RESTful API**: API chuẩn REST với NestJS
- 🗄️ **Database Management**: PostgreSQL với Drizzle ORM
- 🏗️ **Modular Architecture**: Kiến trúc module hóa, dễ mở rộng
- 🛡️ **Type Safety**: TypeScript đảm bảo type safety
- ✅ **Validation**: Input validation với class-validator
- 🌍 **Multilingual**: Hỗ trợ Tiếng Việt và Tiếng Anh
- 🤖 **AI Translation**: Tích hợp OpenAI cho dịch thuật tự động
- 📊 **Pagination**: Hỗ trợ phân trang cho tất cả endpoints
- 🧪 **Testing**: Unit testing và E2E testing với Jest

## 🛠 Công nghệ

- 🚀 **Framework**: NestJS 11.0.1
- 📝 **Language**: TypeScript
- 🗄️ **Database**: PostgreSQL với Drizzle ORM
- ✅ **Validation**: class-validator, class-transformer
- 🤖 **AI**: OpenAI API cho dịch thuật
- 🧪 **Testing**: Jest
- 📦 **Package Manager**: pnpm

## 🚀 Cài đặt

### 📋 Yêu cầu

- 🟢 **Node.js** >= 18.0.0
- 📦 **pnpm** >= 8.0.0
- 🐘 **PostgreSQL** >= 13.0
- 🤖 **OpenAI API Key**

### ⚡ Quick Start

```bash
# Clone repository
git clone <repository-url>
cd sit/backend

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
pnpm db:push

# Start development server
pnpm start:dev

# API available at http://localhost:3001
```

### 🔧 Commands

```bash
# Development
pnpm start:dev          # Start development server
pnpm start:debug       # Start with debug mode

# Production
pnpm build              # Build for production
pnpm start:prod         # Start production server

# Database
pnpm db:generate         # Generate migration
pnpm db:push            # Push schema changes

# Testing
pnpm test               # Unit tests
pnpm test:e2e           # E2E tests
pnpm test:cov           # Coverage report

# Code Quality
pnpm lint               # ESLint
pnpm format             # Prettier
```

## 📁 Cấu trúc

```
backend/
├── src/
│   ├── modules/                # Feature modules
│   │   ├── courses/           # Courses management
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── courses.controller.ts
│   │   │   ├── courses.module.ts
│   │   │   └── courses.service.ts
│   │   ├── programs/          # Programs management
│   │   ├── majors/            # Majors management
│   │   ├── education-levels/  # Education levels
│   │   ├── program-structures/ # Program structures
│   │   └── translation/        # Translation management
│   ├── common/                # Shared utilities
│   │   ├── dto/               # Base DTOs
│   │   └── utils/             # Utility functions
│   ├── database/              # Database configuration
│   │   └── database.module.ts
│   ├── app.controller.ts      # Root controller
│   ├── app.module.ts          # Root module
│   ├── app.service.ts         # Root service
│   └── main.ts                # Application entry point
├── db/                        # Database schema
│   └── schema.ts              # Drizzle schema
├── drizzle/                    # Database migrations
│   ├── meta/                  # Migration metadata
│   └── *.sql                  # Migration files
├── test/                       # E2E tests
├── drizzle.config.ts          # Drizzle configuration
├── package.json               # Dependencies
└── tsconfig.json             # TypeScript configuration
```

## 🗄️ Database

### 📊 Schema Overview

Dự án sử dụng PostgreSQL với Drizzle ORM:

- 📚 **Programs**: Thông tin các chương trình đào tạo
- 📖 **Courses**: Thông tin các môn học (tách biệt vi/en)
- 🎓 **Majors**: Thông tin các chuyên ngành
- 📊 **Education Levels**: Các cấp độ đào tạo
- 🏗️ **Program Structures**: Cấu trúc chương trình (tách biệt vi/en)
- 🔄 **Translation Jobs**: Công việc dịch thuật

### 🌍 Multilingual Design

Mỗi entity có 2 bảng:
- `*_vi`: Nội dung tiếng Việt (nguồn gốc)
- `*_en`: Nội dung tiếng Anh (được dịch)

### 🔧 Migration Commands

```bash
# Generate migration
pnpm db:generate

# Push schema changes
pnpm db:push

# Pull from database
npx drizzle-kit pull
```

## 🌐 API Endpoints

### 🏠 Root
- `GET /api` - API information
- `GET /api/health` - Health check

### 🎓 Education Levels
- `GET /api/education-levels` - List education levels
- `POST /api/education-levels` - Create education level
- `GET /api/education-levels/:id` - Get education level details
- `PUT /api/education-levels/:id` - Update education level
- `DELETE /api/education-levels/:id` - Delete education level

### 📚 Majors
- `GET /api/majors` - List majors
- `POST /api/majors` - Create major
- `GET /api/majors/:id` - Get major details
- `PUT /api/majors/:id` - Update major
- `DELETE /api/majors/:id` - Delete major

### 🎯 Programs
- `GET /api/programs` - List programs
- `POST /api/programs` - Create program
- `GET /api/programs/:id` - Get program details
- `GET /api/programs/major/:majorId` - Get programs by major
- `PUT /api/programs/:id` - Update program
- `DELETE /api/programs/:id` - Delete program

### 📖 Courses
- `GET /api/courses` - List courses
- `POST /api/courses/vietnamese` - Create Vietnamese course
- `POST /api/courses/english` - Create English course
- `GET /api/courses/:code` - Get course details
- `PUT /api/courses/:code/vietnamese` - Update Vietnamese course
- `PUT /api/courses/:code/english` - Update English course
- `DELETE /api/courses/:code` - Delete course

### 🏗️ Program Structures
- `GET /api/program-structures/program/:programId` - Get program structure
- `POST /api/program-structures/vietnamese` - Create Vietnamese structure
- `POST /api/program-structures/english` - Create English structure
- `PUT /api/program-structures/program/:programId/order/:order/vietnamese` - Update Vietnamese structure
- `PUT /api/program-structures/program/:programId/order/:order/english` - Update English structure
- `DELETE /api/program-structures/program/:programId/order/:order` - Delete structure

## 🔄 Translation

### 🤖 OpenAI Integration

Hệ thống tích hợp OpenAI để dịch thuật tự động:

- 📝 **Text Translation**: Dịch văn bản trực tiếp
- 🔄 **Batch Translation**: Dịch hàng loạt
- 📊 **Job Management**: Quản lý công việc dịch thuật
- ✅ **Status Tracking**: Theo dõi trạng thái dịch thuật

### 🔧 Translation Endpoints

- `GET /api/translation/jobs` - List translation jobs
- `POST /api/translation/jobs` - Create translation job
- `POST /api/translation/process/:jobId` - Process translation
- `POST /api/translation/batch` - Batch translation
- `POST /api/translation/translate-text` - Direct text translation
- `PUT /api/translation/jobs/:jobId/status` - Update job status

### 📝 Example Usage

```bash
# Direct text translation
curl -X POST http://localhost:3001/api/translation/translate-text \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Khoa học Máy tính là ngành học về thiết kế và phát triển phần mềm",
    "context": "Major description"
  }'
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

## 🧪 Testing

### 🔧 Test Commands

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage report
pnpm test:cov

# Watch mode
pnpm test:watch
```

### 📊 Test Structure

```
test/
├── app.e2e-spec.ts     # E2E tests
└── jest-e2e.json       # Jest E2E configuration
```

## 🔒 Security

- ✅ **Input Validation**: class-validator cho tất cả inputs
- 🛡️ **CORS Configuration**: Cross-origin resource sharing
- 🔐 **Environment Variables**: Sensitive data protection
- 🚫 **SQL Injection Protection**: Drizzle ORM parameterized queries
- 🔑 **API Key Management**: Secure OpenAI API key handling

## 📞 Liên hệ

- 🌐 **Website**: [https://sit.ttu.edu.vn](https://sit.ttu.edu.vn)
- 🚀 **Live Demo**: [https://sit-ttu.vercel.app/](https://sit-ttu.vercel.app/)
- 📧 **Email**: [sit@ttu.edu.vn](mailto:sit@ttu.edu.vn)
- 📍 **Địa chỉ**: Đại học Tân Tạo, Long An, Việt Nam

---

<div align="center">

**🎓 Đại học Tân Tạo** - Khoa Công nghệ Thông tin

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://sit.ttu.edu.vn)

</div>
<div align="center">

# 🎓 School of Information Technology
## Tan Tao University

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Website chính thức của Khoa Công nghệ Thông tin - Đại học Tân Tạo**

*Modern web application với Next.js frontend và NestJS backend*

[🌐 Website](https://sit.ttu.edu.vn) • [📧 Email](mailto:info@ttu.edu.vn) • [📍 Location](https://maps.google.com/?q=Tan+Tao+University+Long+An+Vietnam)

</div>

---

## 📋 Mục lục

- [🎯 Giới thiệu](#-giới-thiệu)
- [✨ Tính năng chính](#-tính-năng-chính)
- [🛠 Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [📁 Cấu trúc dự án](#-cấu-trúc-dự-án)
- [🚀 Cài đặt và chạy dự án](#-cài-đặt-và-chạy-dự-án)
- [🗄️ Database Schema](#️-database-schema)
- [🌐 API Documentation](#-api-documentation)
- [🎨 UI Components](#-ui-components)
- [🌍 Internationalization](#-internationalization)
- [📱 Responsive Design](#-responsive-design)
- [🚀 Deployment](#-deployment)
- [🧪 Testing](#-testing)
- [📊 Performance](#-performance)
- [🔒 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Liên hệ](#-liên-hệ)

---

## 🎯 Giới thiệu

Website chính thức của Khoa Công nghệ Thông tin - Đại học Tân Tạo (Tan Tao University - School of Information Technology). Dự án bao gồm cả frontend và backend để cung cấp một hệ thống web hoàn chỉnh cho việc quản lý và hiển thị thông tin về các chương trình đào tạo, tin tức, và hoạt động của khoa.

## ✨ Tính năng chính

### 🎨 Frontend (Next.js)
- 📱 **Responsive Design**: Tối ưu cho mọi thiết bị từ desktop đến mobile
- 🎨 **Modern UI/UX**: Giao diện hiện đại với Tailwind CSS và Radix UI
- 🔍 **SEO Optimized**: Tối ưu hóa SEO với metadata đầy đủ
- 🌍 **Multilingual Support**: Hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh)
- ⚡ **Performance**: Tối ưu hiệu suất với Next.js 15 và Turbopack
- ♿ **Accessibility**: Tuân thủ các tiêu chuẩn accessibility

### 🔧 Backend (NestJS)
- 🔌 **RESTful API**: API RESTful với NestJS framework
- 🗄️ **Database Management**: Quản lý cơ sở dữ liệu với Drizzle ORM
- 🏗️ **Modular Architecture**: Kiến trúc module hóa, dễ mở rộng
- 🛡️ **Type Safety**: TypeScript đảm bảo type safety
- ✅ **Validation**: Input validation với class-validator
- 🧪 **Testing**: Unit testing và E2E testing với Jest

## 🛠 Công nghệ sử dụng

### 🎨 Frontend
- ⚛️ **Framework**: Next.js 15.5.2
- 📝 **Language**: TypeScript
- 🎨 **Styling**: Tailwind CSS v4
- 🧩 **UI Components**: Radix UI
- 🎯 **Icons**: Lucide React
- 🎬 **Animations**: Framer Motion
- 📦 **Package Manager**: pnpm

### 🔧 Backend
- 🚀 **Framework**: NestJS 11.0.1
- 📝 **Language**: TypeScript
- 🗄️ **Database**: PostgreSQL với Drizzle ORM
- ✅ **Validation**: class-validator, class-transformer
- 🧪 **Testing**: Jest
- 📦 **Package Manager**: pnpm

## 📁 Cấu trúc dự án

```
sit/
├── app/                          # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── [locale]/         # Internationalization
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Homepage
│   │   ├── components/           # React components
│   │   │   ├── ui/               # UI components (Radix UI)
│   │   │   ├── Header.tsx        # Header component
│   │   │   ├── Hero.tsx          # Hero section
│   │   │   ├── Programs.tsx      # Programs section
│   │   │   └── Footer.tsx        # Footer component
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions
│   │   └── messages/             # i18n messages
│   ├── public/                   # Static assets
│   └── package.json
├── backend/                      # Backend (NestJS)
│   ├── src/
│   │   ├── modules/              # Feature modules
│   │   │   ├── courses/          # Courses management
│   │   │   ├── programs/         # Programs management
│   │   │   ├── majors/           # Majors management
│   │   │   ├── education-levels/ # Education levels
│   │   │   ├── program-structures/ # Program structures
│   │   │   └── translation/      # Translation management
│   │   ├── common/               # Shared utilities
│   │   ├── database/             # Database configuration
│   │   └── main.ts               # Application entry point
│   ├── db/                       # Database schema
│   ├── drizzle/                  # Database migrations
│   └── package.json
├── README.md                     # This file
├── LICENSE                       # License file
└── .gitignore                    # Git ignore rules
```

## 🚀 Cài đặt và chạy dự án

### 📋 Yêu cầu hệ thống

- 🟢 **Node.js** >= 18.0.0
- 📦 **pnpm** >= 8.0.0  
- 🐘 **PostgreSQL** >= 13.0

### 🎨 Cài đặt Frontend

<details>
<summary>📖 Click để xem hướng dẫn chi tiết</summary>

1. **Di chuyển vào thư mục frontend:**
```bash
cd app
```

2. **Cài đặt dependencies:**
```bash
pnpm install
```

3. **Chạy development server:**
```bash
pnpm dev
```

4. **Mở trình duyệt và truy cập:** [http://localhost:3000](http://localhost:3000) 🌐

</details>

### 🔧 Cài đặt Backend

<details>
<summary>📖 Click để xem hướng dẫn chi tiết</summary>

1. **Di chuyển vào thư mục backend:**
```bash
cd backend
```

2. **Cài đặt dependencies:**
```bash
pnpm install
```

3. **Cấu hình database:**
```bash
# Copy environment file
cp .env.example .env

# Cập nhật thông tin database trong .env
```

4. **Chạy database migrations:**
```bash
pnpm db:push
```

5. **Chạy development server:**
```bash
pnpm start:dev
```

6. **API sẽ chạy tại:** [http://localhost:3001](http://localhost:3001) 🔌

</details>

### ⚡ Các lệnh hữu ích

#### 🎨 Frontend Commands
```bash
# 🏗️ Build cho production
pnpm build

# 🚀 Chạy production server
pnpm start

# ⚡ Chạy với Turbopack (faster)
pnpm dev --turbopack
```

#### 🔧 Backend Commands
```bash
# 🏗️ Build project
pnpm build

# 🚀 Chạy production
pnpm start:prod

# 🗄️ Database operations
pnpm db:generate    # Generate migration
pnpm db:push        # Push schema changes

# 🧪 Testing
pnpm test           # Unit tests
pnpm test:e2e       # E2E tests
pnpm test:cov       # Coverage report

# 🔍 Code quality
pnpm lint           # ESLint
pnpm format         # Prettier
```

## 🗄️ Database Schema

Dự án sử dụng PostgreSQL với Drizzle ORM. Các bảng chính bao gồm:

- 📚 **Programs**: Thông tin các chương trình đào tạo
- 📖 **Courses**: Thông tin các môn học  
- 🎓 **Majors**: Thông tin các chuyên ngành
- 📊 **Education Levels**: Các cấp độ đào tạo
- 🏗️ **Program Structures**: Cấu trúc chương trình
- 🌍 **Translations**: Dịch thuật đa ngôn ngữ

> 📝 **Chi tiết về cấu trúc database xem tại** `backend/DATABASE_STRUCTURE.md`

## 🌐 API Documentation

API endpoints được document tại `backend/API_GUIDES.md`. Các endpoint chính:

- 📚 `GET /programs` - Lấy danh sách chương trình
- 📖 `GET /courses` - Lấy danh sách môn học
- 🎓 `GET /majors` - Lấy danh sách chuyên ngành
- 📊 `GET /education-levels` - Lấy danh sách cấp độ đào tạo

> 📖 **Xem chi tiết API documentation tại** `backend/API_GUIDES.md`

## 🎨 UI Components

Dự án sử dụng Radix UI components với Tailwind CSS:

- 🔘 **Button**: Nút bấm với nhiều variants
- 🃏 **Card**: Card component cho layout
- 📋 **Dropdown Menu**: Menu dropdown
- 🍞 **Toast**: Thông báo toast

> 🎨 **Tất cả UI components được tùy chỉnh và tối ưu cho dự án**

## 🌍 Internationalization

Dự án hỗ trợ đa ngôn ngữ với next-intl:

- 🇻🇳 **Tiếng Việt** (vi)
- 🇺🇸 **Tiếng Anh** (en)

> 📁 **Các file translation nằm trong** `app/src/messages/`

## 📱 Responsive Design

Website được thiết kế responsive với breakpoints:

- 📱 **Mobile**: < 768px
- 📟 **Tablet**: 768px - 1024px  
- 💻 **Desktop**: > 1024px

> 📐 **Tất cả components đều được tối ưu cho mọi kích thước màn hình**

## 🚀 Deployment

### 🎨 Frontend (Vercel - Recommended)

1. 📤 Push code lên GitHub
2. 🔗 Kết nối repository với Vercel
3. 🚀 Deploy tự động với mỗi commit

### 🔧 Backend (Railway/Heroku)

1. ⚙️ Cấu hình environment variables
2. 🐳 Deploy với Docker hoặc trực tiếp
3. 🗄️ Cấu hình database connection

### 📦 Manual Deployment

```bash
# 🎨 Frontend
cd app
pnpm build
# Upload .next folder

# 🔧 Backend  
cd backend
pnpm build
# Upload dist folder
```

## 🧪 Testing

### 🎨 Frontend Testing
```bash
cd app
# Chạy tests (nếu có)
```

### 🔧 Backend Testing
```bash
cd backend
pnpm test           # Unit tests
pnpm test:e2e       # E2E tests
pnpm test:cov       # Coverage
```

> 🧪 **Backend có đầy đủ unit tests và E2E tests với Jest**

## 📊 Performance

- 🎨 **Frontend**: Lighthouse score > 90
- 🔧 **Backend**: Response time < 200ms
- 🗄️ **Database**: Optimized queries với Drizzle ORM

> ⚡ **Tất cả đều được tối ưu hóa để đạt hiệu suất cao nhất**

## 🔒 Security

- ✅ Input validation với class-validator
- 🛡️ CORS configuration
- 🔐 Environment variables cho sensitive data
- 🚫 SQL injection protection với Drizzle ORM

> 🔒 **Security được ưu tiên hàng đầu trong thiết kế hệ thống**

## 🤝 Contributing

1. 🍴 Fork repository
2. 🌿 Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to branch (`git push origin feature/AmazingFeature`)
5. 🔄 Mở Pull Request

### 📝 Code Style

- 🔍 ESLint + Prettier cho code formatting
- 📝 TypeScript strict mode
- 📋 Conventional commits

> 🤝 **Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng!**

## 📄 License

Dự án này thuộc về Đại học Tân Tạo. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

> 📜 **MIT License - Đại học Tân Tạo**

## 📞 Liên hệ

- 🌐 **Website**: [https://sit.ttu.edu.vn](https://sit.ttu.edu.vn)
- 📧 **Email**: [info@ttu.edu.vn](mailto:info@ttu.edu.vn)
- 📍 **Địa chỉ**: Đại học Tân Tạo, Long An, Việt Nam

> 📞 **Liên hệ với chúng tôi để biết thêm thông tin!**

## 📝 Changelog

### 🎉 v0.1.0
- 🚀 Initial release
- ⚛️ Frontend với Next.js 15
- 🔧 Backend với NestJS 11
- 🗄️ Database schema với Drizzle ORM
- 🌍 Multilingual support
- 📱 Responsive design
- 🔍 SEO optimization

---

<div align="center">

**🎓 Đại học Tân Tạo** - Đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính.

[![Made with ❤️](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://sit.ttu.edu.vn)
[![Tan Tao University](https://img.shields.io/badge/Tan%20Tao%20University-SIT-blue?style=for-the-badge)](https://sit.ttu.edu.vn)

</div>
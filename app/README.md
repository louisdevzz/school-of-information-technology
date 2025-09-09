# Đại học Tân Tạo - Khoa Công nghệ Thông tin

Website chính thức của Khoa Công nghệ Thông tin - Đại học Tân Tạo (Tan Tao University - School of Information Technology).

## Giới thiệu

Đây là dự án website frontend được xây dựng bằng Next.js cho Khoa Công nghệ Thông tin của Đại học Tân Tạo. Website cung cấp thông tin về các chương trình đào tạo, tin tức, sự kiện và các hoạt động của khoa.

## Tính năng

- **Responsive Design**: Tối ưu cho mọi thiết bị từ desktop đến mobile
- **Modern UI/UX**: Giao diện hiện đại với Tailwind CSS và Radix UI
- **SEO Optimized**: Tối ưu hóa SEO với metadata đầy đủ
- **Multilingual Support**: Hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh)
- **Performance**: Tối ưu hiệu suất với Next.js 15 và Turbopack
- **Accessibility**: Tuân thủ các tiêu chuẩn accessibility

## Công nghệ sử dụng

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Package Manager**: pnpm
- **Build Tool**: Turbopack

## Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd frontend
```

2. Cài đặt dependencies:
```bash
pnpm install
```

3. Chạy development server:
```bash
pnpm dev
```

4. Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000)

### Các lệnh khác

```bash
# Build cho production
pnpm build

# Chạy production server
pnpm start

# Chạy với Turbopack (faster)
pnpm dev --turbopack
```

## Cấu trúc dự án

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout với metadata
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # UI components (Radix UI)
│   ├── Header.tsx         # Header component
│   ├── Hero.tsx           # Hero section
│   ├── Programs.tsx       # Programs section
│   └── Footer.tsx         # Footer component
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/                # Static assets
```

## Metadata và SEO

Website được tối ưu hóa SEO với:

- **Title**: "BẢN TIN & SỰ KIỆN – TAN TAO UNIVERSITY"
- **Description**: Mô tả chi tiết về khoa và chương trình đào tạo
- **Keywords**: Từ khóa liên quan đến đại học và công nghệ thông tin
- **Open Graph**: Tối ưu cho social media sharing
- **Twitter Cards**: Tối ưu cho Twitter sharing
- **Icons**: Favicon và app icons đa kích thước
- **Multilingual**: Hỗ trợ hreflang cho SEO đa ngôn ngữ

## Deployment

### Vercel (Recommended)

1. Push code lên GitHub
2. Kết nối repository với Vercel
3. Deploy tự động với mỗi commit

### Manual Deployment

```bash
# Build project
pnpm build

# Deploy static files
# Upload .next/static và .next/server folders
```

## Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

Dự án này thuộc về Đại học Tân Tạo. Mọi quyền được bảo lưu.

## Liên hệ

- **Website**: [https://sit.ttu.edu.vn](https://sit.ttu.edu.vn)
- **Email**: info@ttu.edu.vn
- **Địa chỉ**: Đại học Tân Tạo, Long An, Việt Nam

## Changelog

### v0.1.0
- Initial release
- Basic homepage với Header, Hero, Programs, Footer
- Responsive design
- SEO optimization
- Multilingual support setup

---

**Đại học Tân Tạo** - Đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính.
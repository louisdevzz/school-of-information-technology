import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khoa Công nghệ Thông tin - Đại học Tân Tạo",
  description: "Khoa Công nghệ Thông tin - Đại học Tân Tạo đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính. Đồng hành cùng cách mạng công nghệ 4.0.",
  keywords: "Khoa Công nghệ Thông tin, Đại học Tân Tạo, Tan Tao University, SIT, School of Information Technology, IT, Computer Science, Đào tạo, Giáo dục, Công nghệ 4.0",
  authors: [{ name: "Khoa Công nghệ Thông tin - Đại học Tân Tạo" }],
  creator: "Khoa Công nghệ Thông tin - Đại học Tân Tạo",
  publisher: "Khoa Công nghệ Thông tin - Đại học Tân Tạo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://sit.ttu.edu.vn",
    siteName: "Khoa Công nghệ Thông tin - Đại học Tân Tạo",
    title: "Khoa Công nghệ Thông tin - Đại học Tân Tạo",
    description: "Khoa Công nghệ Thông tin - Đại học Tân Tạo đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính. Đồng hành cùng cách mạng công nghệ 4.0.",
    images: [
      {
        url: "https://sit.ttu.edu.vn/wp-content/uploads/2025/01/cropped-orange_logo-01-1-192x192.png",
        width: 192,
        height: 192,
        alt: "Tan Tao University Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khoa Công nghệ Thông tin - Đại học Tân Tạo",
    description: "Khoa Công nghệ Thông tin - Đại học Tân Tạo đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính. Đồng hành cùng cách mạng công nghệ 4.0.",
    images: ["https://sit.ttu.edu.vn/wp-content/uploads/2025/01/cropped-orange_logo-01-1-192x192.png"],
  },
  alternates: {
    canonical: "https://sit.ttu.edu.vn",
    languages: {
      "vi-VN": "https://sit.ttu.edu.vn",
      "en-US": "https://sit.ttu.edu.vn/en",
    },
  },
  icons: {
    icon: [
      { url: "https://sit.ttu.edu.vn/wp-content/uploads/2025/01/cropped-orange_logo-01-1-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "https://sit.ttu.edu.vn/wp-content/uploads/2025/01/cropped-orange_logo-01-1-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "https://sit.ttu.edu.vn/wp-content/uploads/2025/01/cropped-orange_logo-01-1-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "https://sit.ttu.edu.vn/wp-content/uploads/2025/01/cropped-orange_logo-01-1-270x270.png",
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

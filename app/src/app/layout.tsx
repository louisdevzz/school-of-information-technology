import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BẢN TIN & SỰ KIỆN – TAN TAO UNIVERSITY",
  description: "Đại học Tân Tạo - Khoa Công nghệ Thông tin đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính",
  keywords: "Đại học Tân Tạo, Tan Tao University, Công nghệ Thông tin, IT, Computer Science, Đào tạo, Giáo dục",
  authors: [{ name: "Tan Tao University" }],
  creator: "Tan Tao University",
  publisher: "Tan Tao University",
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
    siteName: "Tan Tao University",
    title: "BẢN TIN & SỰ KIỆN – TAN TAO UNIVERSITY",
    description: "Đại học Tân Tạo - Khoa Công nghệ Thông tin đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính",
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
    title: "BẢN TIN & SỰ KIỆN – TAN TAO UNIVERSITY",
    description: "Đại học Tân Tạo - Khoa Công nghệ Thông tin đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực Công nghệ Thông tin và Máy tính",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Menu, Search, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-background/95 backdrop-blur-xl border-b border-primary/20 sticky top-0 z-50 shadow-elegant"
    >
      <div className="w-full px-10">
        {/* Top Info Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-b border-primary/20 py-3"
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-primary font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>+84 27 2376 9216</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-primary font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>sit@ttu.edu.vn</span>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:flex items-center gap-2 text-muted-foreground"
            >
              <span>Đồng hành cùng cách mạng công nghệ 4.0</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-between py-6"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2"
          >
            <Link href={"/"} className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="SIT" className="w-16 h-16" />
              <div>
                <h1 className="font-display text-2xl font-bold">
                  Trường Đại học Tân Tạo
                </h1>
                <p className="text-sm text-primary font-medium">Khoa Công nghệ Thông tin</p>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              "Giới thiệu",
              "Chương trình đào tạo", 
              "Sinh viên",
              "Nghiên cứu",
              "Tin tức"
            ].map((item, index) => (
              <motion.a 
                key={index}
                href="#" 
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-foreground hover:text-primary transition-all duration-300 font-medium"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="default" 
                className="hidden md:inline-flex bg-gradient-orange hover:shadow-glow"
              >
                <Phone className="mr-2 h-4 w-4" />
                Liên hệ tư vấn
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
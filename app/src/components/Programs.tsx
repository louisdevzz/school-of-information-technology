"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Database, Smartphone, Brain, ArrowRight, Sparkles, Zap, Target, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Programs = () => {
  const programs = [
    {
      icon: Code,
      title: "Cử nhân Khoa học Máy tính",
      code: "7480101",
      description: "Phát triển kỹ năng lập trình và thiết kế hệ thống phần mềm hiện đại với định hướng Kỹ thuật Dữ liệu và Kỹ thuật phần mềm",
      features: ["Java, Python, C++", "Web Development", "Mobile Apps", "Software Architecture", "Data Engineering"],
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: Brain,
      title: "Cử nhân Trí tuệ Nhân tạo",
      code: "7480109",
      description: "Nghiên cứu và ứng dụng AI, Machine Learning với định hướng Thị giác máy tính và Xử lý ngôn ngữ tự nhiên",
      features: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Neural Networks"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Database,
      title: "Cử nhân Khoa học Dữ liệu",
      code: "7480104",
      description: "Phân tích và khai thác dữ liệu với định hướng Tin Sinh học và Phân tích kinh doanh",
      features: ["Data Analytics", "Business Intelligence", "Bioinformatics", "Statistical Modeling", "Big Data"],
      gradient: "from-orange-600 to-yellow-500"
    },
    {
      icon: Smartphone,
      title: "Thạc sĩ Khoa học Máy tính",
      code: "7480102",
      description: "Chương trình sau đại học chuyên sâu về nghiên cứu và phát triển công nghệ tiên tiến",
      features: ["Advanced Algorithms", "Research Methods", "Thesis Project", "Industry Collaboration", "Innovation"],
      gradient: "from-red-500 to-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-primary/15 rounded-full blur-xl"
        />
      </div>

      <div className="w-full px-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 text-primary font-semibold rounded-full text-sm mb-6 backdrop-blur-sm border border-primary/30"
          >
            <Sparkles className="w-4 h-4" />
            Chương trình đào tạo
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-sans text-5xl md:text-6xl font-bold text-foreground mb-8"
          >
            Khám phá các chương trình
            <br />
            <span className="text-primary-glow">Công nghệ Thông tin</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-sans"
          >
            Khoa Công nghệ Thông tin TTU áp dụng triết lí giáo dục "Khai phóng - học suốt đời" với chương trình học 
            được xây dựng dựa trên chương trình của Đại học Duke, Hoa Kỳ.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-3xl shadow-elegant"
            >
              <img
                src="/assets/meeting.png"
                alt="Computer Science Laboratory"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </motion.div>
            {/* Floating badges */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-orange rounded-full flex items-center justify-center shadow-glow"
            >
              <Star className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="font-sans text-4xl font-bold text-foreground mb-8"
            >
              Tại sao chọn SIT?
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-2 font-sans">Mô hình giáo dục</h4>
                  <p className="text-muted-foreground font-sans">Áp dụng triết lí giáo dục "Khai phóng - học suốt đời" với chương trình học được xây dựng dựa trên chương trình của Đại học Duke, Hoa Kỳ.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-2 font-sans">Đội ngũ giảng viên</h4>
                  <p className="text-muted-foreground font-sans">Đa số giảng viên có bằng tiến sĩ từ các trường Đại học uy tín trong và ngoài nước với hồ sơ nghiên cứu mạnh.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-foreground mb-2 font-sans">Nghiên cứu</h4>
                  <p className="text-muted-foreground font-sans">100% sinh viên được tham gia vào các dự án nghiên cứu và có thể thực tập trong ngành công nghiệp.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-start"
            >
              <Button 
                variant="default" 
                className="bg-gradient-orange hover:shadow-glow border-2 border-primary/20 hover:border-primary/40"
                size="lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                Tìm hiểu về hỗ trợ tài chính
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.5 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full group hover:shadow-elegant transition-all duration-500 bg-card/80 backdrop-blur-sm border-border/50 overflow-hidden relative flex flex-col">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-16 h-16 bg-gradient-orange rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300"
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/30">
                          {program.code}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                      {program.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10 flex flex-col flex-grow">
                    <ul className="space-y-3 mb-6 flex-grow">
                      {program.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.7 + index * 0.15 + featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="text-sm text-muted-foreground flex items-center group-hover:text-foreground transition-colors duration-300"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.2 }}
                            className="w-2 h-2 bg-primary rounded-full mr-3 group-hover:bg-primary transition-colors duration-300"
                          ></motion.div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="ghost" 
                        className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 border-2 border-primary/20 group-hover:border-primary/40"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Xem chi tiết
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex justify-center"
          >
            <Button 
              variant="default" 
              size="lg"
              className="bg-gradient-orange hover:shadow-glow px-12 py-6 text-lg border-2 border-primary/20 hover:border-primary/40"
            >
              <Zap className="mr-3 h-6 w-6" />
              Xem tất cả chương trình
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
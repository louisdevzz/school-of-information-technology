# Cấu trúc Database Schema - SIT Backend

## 🔗 Liên kết giữa các bảng

Theo cấu trúc thực tế từ website [SIT TTU](https://sit.ttu.edu.vn/cu-nhan-khoa-hoc-may-tinh/), các bảng được liên kết theo thứ tự phân cấp:

```
Education Levels (Cấp độ đào tạo)
    ↓
Majors (Ngành học)
    ↓
Programs (Chương trình đào tạo)
    ↓
Program Structures (Cấu trúc chương trình)
    ↓
Program Courses (Môn học trong chương trình)
    ↓
Courses (Chi tiết môn học)
```

## 📊 Chi tiết liên kết

### 1. Education Levels → Majors
- **Education Level**: Đại học, Sau đại học
- **Major**: Khoa học Máy tính, Khoa học Dữ liệu, Trí tuệ nhân tạo
- **Liên kết**: `majors.educationLevelId` → `educationLevels.id`

### 2. Majors → Programs  
- **Major**: Khoa học Máy tính
- **Program**: Cử nhân Khoa học máy tính (CTĐT năm 2025), (CTĐT năm 2022), (CTĐT năm 2021)
- **Liên kết**: `programs.majorId` → `majors.id`

### 3. Programs → Program Structures
- **Program**: Cử nhân Khoa học máy tính (CTĐT năm 2025)
- **Program Structure**: Kiến thức giáo dục đại cương, Kiến thức cơ sở ngành, Kiến thức chuyên ngành, Thực tập tốt nghiệp
- **Liên kết**: `programStructuresVi.programId` → `programs.id`

### 4. Program Structures → Program Courses
- **Program Structure**: Kiến thức giáo dục đại cương
- **Program Course**: Toán cao cấp, Vật lý đại cương, Triết học Mác-Lênin
- **Liên kết**: `programCourses.programStructureId` → `programStructuresVi.id`

### 5. Program Courses → Courses
- **Program Course**: Môn học trong chương trình (có học kỳ, bắt buộc/tự chọn)
- **Course**: Chi tiết môn học (tín chỉ, giờ học, mô tả)
- **Liên kết**: `programCourses.courseCode` → `coursesVi.code` và `coursesEn.code`

## 🎯 Ví dụ cụ thể từ website SIT

### Cấu trúc thực tế:
```
Đại học (Education Level)
└── Cử nhân Khoa học Máy tính (Major)
    ├── CTĐT năm 2025 (Program)
    ├── CTĐT năm 2022 (Program) 
    └── CTĐT năm 2021 (Program)
        └── Kiến thức giáo dục đại cương (Program Structure)
            ├── Toán cao cấp (Program Course)
            ├── Vật lý đại cương (Program Course)
            └── Triết học Mác-Lênin (Program Course)
                └── Chi tiết môn học (Course)
```

## 📝 Lưu ý quan trọng

- Mỗi **Program** thuộc về một **Major** cụ thể
- Mỗi **Program Structure** thuộc về một **Program** cụ thể  
- Mỗi **Program Course** phải thuộc về một **Program Structure** cụ thể
- **Courses** là bảng độc lập chứa thông tin chi tiết môn học
- **Program Courses** liên kết Courses với Program Structure thông qua `courseCode`

# API Usage Guide - SIT Backend

## 🚀 Tổng quan API

Backend API cho hệ thống thông tin sinh viên với tính năng dịch thuật tự động bằng OpenAI.

### ✅ Tính năng chính:
1. **Auto Translation**: Tự động dịch từ tiếng Việt sang tiếng Anh
2. **Slug Song Ngữ**: URL thân thiện cho từng ngôn ngữ
3. **Hierarchical Structure**: Cấu trúc phân cấp theo database structure
4. **RESTful API**: Chuẩn REST API với CRUD operations

## 📊 Database Structure & API Flow

Theo cấu trúc phân cấp từ database:

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

## 🔗 API Endpoints Overview

```bash
# Base URL
GET /api/info                    # API information
GET /api/health                  # Health check

# Education Levels
GET /api/education-levels        # List all education levels
POST /api/education-levels       # Create education level
GET /api/education-levels/:id    # Get education level by ID
PUT /api/education-levels/:id    # Update education level
DELETE /api/education-levels/:id # Delete education level

# Majors
GET /api/majors                  # List all majors
POST /api/majors                 # Create major
GET /api/majors/:id              # Get major by ID
GET /api/majors/slug/vi/:slug    # Get major by Vietnamese slug
GET /api/majors/slug/en/:slug    # Get major by English slug
PUT /api/majors/:id              # Update major base info
PUT /api/majors/:id/vietnamese   # Update Vietnamese content
PUT /api/majors/:id/english      # Update English content
DELETE /api/majors/:id           # Delete major

# Programs
GET /api/programs                # List all programs
POST /api/programs               # Create program
GET /api/programs/:id            # Get program by ID
PUT /api/programs/:id            # Update program base info
PUT /api/programs/:id/vietnamese # Update Vietnamese content
PUT /api/programs/:id/english    # Update English content
DELETE /api/programs/:id         # Delete program

# Program Structures
GET /api/program-structures      # List all program structures
POST /api/program-structures     # Create program structure
GET /api/program-structures/:id  # Get program structure by ID
PUT /api/program-structures/:id  # Update program structure
DELETE /api/program-structures/:id # Delete program structure

# Courses
GET /api/courses                 # List all courses
POST /api/courses                # Create course
GET /api/courses/:id             # Get course by ID
PUT /api/courses/:id             # Update course base info
PUT /api/courses/:id/vietnamese  # Update Vietnamese content
PUT /api/courses/:id/english     # Update English content
DELETE /api/courses/:id          # Delete course
```

---

## 1️⃣ Education Levels API

### Tạo Education Level

**Request:**
```bash
POST /api/education-levels
Content-Type: application/json

{
  "level": "undergraduate",
  "order": 1,
  "nameVi": "Đại học",
  "descriptionVi": "Cấp độ đào tạo đại học"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "base": {
      "id": 1,
      "level": "undergraduate",
      "order": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "vietnamese": {
      "id": 1,
      "educationLevelId": 1,
      "name": "Đại học",
      "description": "Cấp độ đào tạo đại học",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Education level created successfully with auto-translation"
}
```

### Lấy danh sách Education Levels

**Request:**
```bash
GET /api/education-levels?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "level": "undergraduate",
      "order": 1,
      "vietnamese": {
        "name": "Đại học",
        "description": "Cấp độ đào tạo đại học"
      },
      "english": {
        "name": "Undergraduate",
        "description": "Undergraduate education level"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

## 2️⃣ Majors API

### Tạo Major

**Request:**
```bash
POST /api/majors
Content-Type: application/json

{
  "educationLevelId": 1,
  "code": "CS",
  "degreeType": "bachelor",
  "status": "active",
  "order": 1,
  "nameVi": "Khoa học Máy tính",
  "slugVi": "cu-nhan-khoa-hoc-may-tinh",
  "descriptionVi": "Ngành học về khoa học máy tính và công nghệ thông tin",
  "trainingObjectivesVi": "Mục tiêu của chương trình đào tạo được xây dựng phù hợp với Tầm nhìn, Sứ mệnh và Triết lý giáo dục của Trường Đại học Tân Tạo...",
  "learningOutcomesVi": {
    "knowledge": [
      {
        "stt": 1,
        "ma": "PLO1",
        "content": "Nền tảng về tự nhiên, con người và môi trường: Hiểu biết cơ bản về khoa học tự nhiên, con người và môi trường..."
      },
      {
        "stt": 2,
        "ma": "PLO2",
        "content": "Nền tảng về chính trị, pháp luật, kinh tế và xã hội: Hiểu biết cơ bản về kinh tế và quản lý..."
      }
    ],
    "skills": [
      {
        "stt": 6,
        "ma": "PLO6",
        "content": "Xây dựng và phát triển giải pháp: Áp dụng các kiến thức về KHMT để phân tích, xây dựng và triển khai các giải pháp..."
      },
      {
        "stt": 7,
        "ma": "PLO7",
        "content": "Lựa chọn và áp dụng giải pháp công nghệ: Tìm kiếm, đánh giá và lựa chọn giải pháp công nghệ phù hợp..."
      }
    ],
    "autonomy": [
      {
        "stt": 10,
        "ma": "PLO10",
        "content": "Ý thức nghề nghiệp, đạo đức và trách nhiệm xã hội: Nhận thức rõ trách nhiệm nghề nghiệp..."
      },
      {
        "stt": 11,
        "ma": "PLO11",
        "content": "Tự học và phát triển bản thân bền vững: Có năng lực tự học suốt đời..."
      }
    ]
  },
  "careerOpportunitiesVi": "Sinh viên tốt nghiệp ngành KHMT có thể làm việc ở nhiều vị trí khác nhau: Làm việc trong các công ty công nghệ, Kỹ sư dữ liệu/phân tích dữ liệu, Nhà nghiên cứu/tư vấn về đổi mới sáng tạo...",
  "graduationRequirementsVi": "Thực hiện theo Quy chế Đào tạo hiện hành của Trường Đại học Tân Tạo. Tích lũy đủ học phần, số tín chỉ (tối thiểu 130 tín chỉ)..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "base": {
      "id": 1,
      "educationLevelId": 1,
      "code": "CS",
      "degreeType": "bachelor",
      "status": "active",
      "order": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "vietnamese": {
      "id": 1,
      "majorId": 1,
      "name": "Khoa học Máy tính",
      "slug": "cu-nhan-khoa-hoc-may-tinh",
      "description": "Ngành học về khoa học máy tính và công nghệ thông tin",
      "trainingObjectives": "Mục tiêu của chương trình đào tạo được xây dựng phù hợp với Tầm nhìn, Sứ mệnh và Triết lý giáo dục của Trường Đại học Tân Tạo...",
      "learningOutcomes": {
        "knowledge": [...],
        "skills": [...],
        "autonomy": [...]
      },
      "careerOpportunities": "Sinh viên tốt nghiệp ngành KHMT có thể làm việc ở nhiều vị trí khác nhau...",
      "graduationRequirements": "Thực hiện theo Quy chế Đào tạo hiện hành của Trường Đại học Tân Tạo...",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Major created successfully with auto-translation"
}
```

### Tìm Major theo Slug

**Request:**
```bash
# Tìm theo slug tiếng Việt
GET /api/majors/slug/vi/cu-nhan-khoa-hoc-may-tinh

# Tìm theo slug tiếng Anh
GET /api/majors/slug/en/bachelor-computer-science
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "educationLevelId": 1,
    "code": "CS",
    "degreeType": "bachelor",
    "status": "active",
    "order": 1,
    "vietnamese": {
      "name": "Khoa học Máy tính",
      "slug": "cu-nhan-khoa-hoc-may-tinh",
      "description": "Ngành học về khoa học máy tính và công nghệ thông tin",
      "trainingObjectives": "Mục tiêu của chương trình đào tạo...",
      "learningOutcomes": {
        "knowledge": [...],
        "skills": [...],
        "autonomy": [...]
      },
      "careerOpportunities": "Sinh viên tốt nghiệp ngành KHMT có thể làm việc...",
      "graduationRequirements": "Thực hiện theo Quy chế Đào tạo hiện hành..."
    },
    "english": {
      "name": "Computer Science",
      "slug": "bachelor-computer-science",
      "description": "Field of study in computer science and information technology",
      "trainingObjectives": "The training program objectives are built in accordance with the Vision, Mission and Educational Philosophy of Tan Tao University...",
      "learningOutcomes": {
        "knowledge": [...],
        "skills": [...],
        "autonomy": [...]
      },
      "careerOpportunities": "Computer Science graduates can work in various positions...",
      "graduationRequirements": "Implementation according to the current Training Regulations of Tan Tao University..."
    }
  }
}
```

---

## 3️⃣ Programs API

### Tạo Program

**Request:**
```bash
POST /api/programs
Content-Type: application/json

{
  "majorId": 1,
  "code": "7480101",
  "version": "2025",
  "language": "vi",
  "duration": 4,
  "semesters": 8,
  "totalCredits": 130,
  "trainingType": "chinh_quy",
  "status": "active",
  "year": 2025,
  "minGpa": "2.00",
  "englishRequirement": "TOEFL iBT 61, IELTS 5.0",
  "programNameVi": "Cử nhân Khoa học máy tính",
  "degreeVi": "Cử nhân Khoa học máy tính",
  "descriptionVi": "Chương trình đào tạo cử nhân khoa học máy tính",
  "missionVi": "Đào tạo nguồn nhân lực chất lượng cao",
  "visionVi": "Trở thành trường đại học hàng đầu về công nghệ",
  "coreValuesVi": "Chất lượng, Sáng tạo, Hợp tác",
  "philosophyVi": "Học để làm, làm để học",
  "objectivesVi": "Đào tạo sinh viên có kiến thức vững chắc",
  "learningOutcomesVi": {
    "knowledge": [...],
    "skills": [...],
    "autonomy": [...]
  },
  "graduationRequirementsVi": "Hoàn thành 130 tín chỉ",
  "admissionInfoVi": "Tuyển sinh theo phương thức xét tuyển",
  "careerOpportunitiesVi": "Lập trình viên, Phân tích hệ thống",
  "furtherStudyVi": "Thạc sĩ, Tiến sĩ"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "base": {
      "id": 1,
      "majorId": 1,
      "code": "7480101",
      "version": "2025",
      "language": "vi",
      "duration": 4,
      "semesters": 8,
      "totalCredits": 130,
      "trainingType": "chinh_quy",
      "status": "active",
      "year": 2025,
      "minGpa": "2.00",
      "englishRequirement": "TOEFL iBT 61, IELTS 5.0",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "vietnamese": {
      "id": 1,
      "programId": 1,
      "programName": "Cử nhân Khoa học máy tính",
      "degree": "Cử nhân Khoa học máy tính",
      "description": "Chương trình đào tạo cử nhân khoa học máy tính",
      "mission": "Đào tạo nguồn nhân lực chất lượng cao",
      "vision": "Trở thành trường đại học hàng đầu về công nghệ",
      "coreValues": "Chất lượng, Sáng tạo, Hợp tác",
      "philosophy": "Học để làm, làm để học",
      "objectives": "Đào tạo sinh viên có kiến thức vững chắc",
      "learningOutcomes": {...},
      "graduationRequirements": "Hoàn thành 130 tín chỉ",
      "admissionInfo": "Tuyển sinh theo phương thức xét tuyển",
      "careerOpportunities": "Lập trình viên, Phân tích hệ thống",
      "furtherStudy": "Thạc sĩ, Tiến sĩ",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Program created successfully with auto-translation"
}
```

---

## 4️⃣ Program Structures API

### Tạo Program Structure

**Request:**
```bash
POST /api/program-structures
Content-Type: application/json

{
  "programId": 1,
  "credits": 30,
  "order": 1,
  "nameVi": "Kiến thức giáo dục đại cương",
  "descriptionVi": "Khối kiến thức về giáo dục đại cương"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "base": {
      "id": 1,
      "programId": 1,
      "credits": 30,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "vietnamese": {
      "id": 1,
      "programId": 1,
      "name": "Kiến thức giáo dục đại cương",
      "description": "Khối kiến thức về giáo dục đại cương",
      "credits": 30,
      "order": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Program structure created successfully with auto-translation"
}
```

---

## 5️⃣ Courses API

### Tạo Course

**Request:**
```bash
POST /api/courses
Content-Type: application/json

{
  "code": "CS101",
  "credits": 3,
  "theoryHours": 30,
  "practiceHours": 15,
  "selfStudyHours": 60,
  "courseType": "compulsory",
  "prerequisites": {"courses": ["MATH101"]},
  "nameVi": "Lập trình cơ bản",
  "descriptionVi": "Môn học về lập trình cơ bản với C++",
  "learningOutcomesVi": {
    "knowledge": "Hiểu biết về lập trình",
    "skills": "Kỹ năng lập trình C++"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "base": {
      "id": 1,
      "code": "CS101",
      "credits": 3,
      "theoryHours": 30,
      "practiceHours": 15,
      "selfStudyHours": 60,
      "courseType": "compulsory",
      "prerequisites": {"courses": ["MATH101"]},
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    },
    "vietnamese": {
      "id": 1,
      "code": "CS101",
      "name": "Lập trình cơ bản",
      "description": "Môn học về lập trình cơ bản với C++",
      "credits": 3,
      "theoryHours": 30,
      "practiceHours": 15,
      "selfStudyHours": 60,
      "courseType": "compulsory",
      "prerequisites": {"courses": ["MATH101"]},
      "learningOutcomes": {
        "knowledge": "Hiểu biết về lập trình",
        "skills": "Kỹ năng lập trình C++"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Course created successfully with auto-translation"
}
```

---

## 🔄 Quy trình hoạt động

1. **User gửi request** với nội dung tiếng Việt
2. **API tạo ngay** base record và Vietnamese record
3. **Trả về response** ngay lập tức (không chờ translate)
4. **Background process** tự động translate sang tiếng Anh
5. **Lưu English record** vào database

## 🌟 Tính năng đặc biệt

### **Slug Song Ngữ (Majors):**
- **Slug Việt**: Tự động tạo từ `nameVi` hoặc tùy chỉnh qua `slugVi`
- **Slug Anh**: Tự động tạo từ tên đã dịch sang tiếng Anh
- **Unique**: Mỗi slug là duy nhất trong từng ngôn ngữ
- **SEO Friendly**: URL thân thiện cho từng ngôn ngữ

### **Chuẩn Đầu Ra (Learning Outcomes):**
- **Cấu trúc JSON** với 3 nhóm: `knowledge`, `skills`, `autonomy`
- **Mỗi item** có: `stt` (số thứ tự), `ma` (mã), `content` (nội dung)
- **Auto-translate**: Tự động dịch từng item sang tiếng Anh
- **Flexible**: Có thể có số lượng item khác nhau cho mỗi nhóm

## 🛠️ Cấu hình cần thiết

### Environment Variables:
```bash
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/sit_db
```

### Translation Service:
- Tự động translate từ tiếng Việt sang tiếng Anh
- Sử dụng context phù hợp cho từng loại content
- Xử lý lỗi gracefully (không làm crash main flow)

## 📋 Status của các Entity

- ✅ **Education Levels** - Hoàn thành
- ✅ **Majors** - Hoàn thành với slug song ngữ và chuẩn đầu ra
- ✅ **Programs** - Hoàn thành  
- ✅ **Courses** - Hoàn thành
- ✅ **Program Structures** - Hoàn thành

## 🎯 Ví dụ thực tế từ SIT TTU

### Cấu trúc phân cấp:
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

## 🔗 Liên kết giữa các API

1. **Education Level** → **Major**: `majors.educationLevelId` → `educationLevels.id`
2. **Major** → **Program**: `programs.majorId` → `majors.id`
3. **Program** → **Program Structure**: `programStructuresVi.programId` → `programs.id`
4. **Program Structure** → **Program Course**: `programCourses.programStructureId` → `programStructuresVi.id`
5. **Program Course** → **Course**: `programCourses.courseCode` → `coursesVi.code`

## 📝 Lưu ý quan trọng

- Mỗi **Program** thuộc về một **Major** cụ thể
- Mỗi **Program Structure** thuộc về một **Program** cụ thể  
- Mỗi **Program Course** phải thuộc về một **Program Structure** cụ thể
- **Courses** là bảng độc lập chứa thông tin chi tiết môn học
- **Program Courses** liên kết Courses với Program Structure thông qua `courseCode`
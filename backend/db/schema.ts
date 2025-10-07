import { pgTable, serial, varchar, text, integer, boolean, timestamp, decimal, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const programStatusEnum = pgEnum('program_status', ['draft', 'active', 'inactive', 'archived']);
export const courseTypeEnum = pgEnum('course_type', ['compulsory', 'elective', 'optional']);
export const semesterEnum = pgEnum('semester', ['1', '2', '3', '4', '5', '6', '7', '8']);
export const translationStatusEnum = pgEnum('translation_status', ['pending', 'translated', 'reviewed', 'approved']);
export const educationLevelEnum = pgEnum('education_level', ['undergraduate', 'postgraduate']);
export const degreeTypeEnum = pgEnum('degree_type', ['bachelor', 'master', 'phd']);

// Education Levels Base - Bảng chung cho cấp độ đào tạo
export const educationLevels = pgTable('education_levels', {
  id: serial('id').primaryKey(),
  level: educationLevelEnum('level').notNull().unique(), // undergraduate, postgraduate
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Education Levels Vietnamese - Cấp độ đào tạo tiếng Việt
export const educationLevelsVi = pgTable('education_levels_vi', {
  id: serial('id').primaryKey(),
  educationLevelId: integer('education_level_id').notNull().references(() => educationLevels.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(), // Đại học, Sau Đại học
  description: text('description'), // Mô tả tiếng Việt
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Education Levels English - Cấp độ đào tạo tiếng Anh
export const educationLevelsEn = pgTable('education_levels_en', {
  id: serial('id').primaryKey(),
  educationLevelId: integer('education_level_id').notNull().references(() => educationLevels.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(), // Undergraduate, Postgraduate
  description: text('description'), // Mô tả tiếng Anh
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Majors Base - Bảng chung cho ngành học
export const majors = pgTable('majors', {
  id: serial('id').primaryKey(),
  educationLevelId: integer('education_level_id').notNull().references(() => educationLevels.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 20 }).notNull().unique(), // Mã ngành: CS, DS, AI
  degreeType: degreeTypeEnum('degree_type').notNull(), // bachelor, master, phd
  status: programStatusEnum('status').notNull().default('active'),
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Majors Vietnamese - Ngành học tiếng Việt
export const majorsVi = pgTable('majors_vi', {
  id: serial('id').primaryKey(),
  majorId: integer('major_id').notNull().references(() => majors.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên ngành tiếng Việt
  slug: varchar('slug', { length: 255 }).notNull().unique(), // URL slug tiếng Việt: cu-nhan-khoa-hoc-may-tinh
  description: text('description'), // Mô tả tiếng Việt
  
  // Mục tiêu đào tạo
  trainingObjectives: text('training_objectives'), // Mục tiêu đào tạo tiếng Việt
  
  // Chuẩn đầu ra (JSON format với cấu trúc: Kiến thức, Kỹ năng, Mức tự chủ và trách nhiệm)
  // Cấu trúc: { "knowledge": [...], "skills": [...], "autonomy": [...] }
  // Mỗi item có: { "stt": number, "ma": string, "content": string }
  learningOutcomes: jsonb('learning_outcomes'), // Chuẩn đầu ra tiếng Việt
  
  // Vị trí làm việc sau khi tốt nghiệp
  careerOpportunities: text('career_opportunities'), // Cơ hội việc làm tiếng Việt
  
  // Điều kiện tốt nghiệp
  graduationRequirements: text('graduation_requirements'), // Điều kiện tốt nghiệp tiếng Việt
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Majors English - Ngành học tiếng Anh
export const majorsEn = pgTable('majors_en', {
  id: serial('id').primaryKey(),
  majorId: integer('major_id').notNull().references(() => majors.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên ngành tiếng Anh
  slug: varchar('slug', { length: 255 }).notNull().unique(), // URL slug tiếng Anh: bachelor-computer-science
  description: text('description'), // Mô tả tiếng Anh
  
  // Mục tiêu đào tạo
  trainingObjectives: text('training_objectives'), // Mục tiêu đào tạo tiếng Anh
  
  // Chuẩn đầu ra (JSON format với cấu trúc: Kiến thức, Kỹ năng, Mức tự chủ và trách nhiệm)
  // Cấu trúc: { "knowledge": [...], "skills": [...], "autonomy": [...] }
  // Mỗi item có: { "stt": number, "ma": string, "content": string }
  learningOutcomes: jsonb('learning_outcomes'), // Chuẩn đầu ra tiếng Anh
  
  // Vị trí làm việc sau khi tốt nghiệp
  careerOpportunities: text('career_opportunities'), // Cơ hội việc làm tiếng Anh
  
  // Điều kiện tốt nghiệp
  graduationRequirements: text('graduation_requirements'), // Điều kiện tốt nghiệp tiếng Anh
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Programs table - Chương trình đào tạo (thông tin chung)
export const programs = pgTable('programs', {
  id: serial('id').primaryKey(),
  majorId: integer('major_id').notNull().references(() => majors.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 20 }).notNull().unique(), // Mã chương trình: 7480101
  version: varchar('version', { length: 50 }).notNull(), // Phiên bản: 2025, 2022, 2021
  language: varchar('language', { length: 20 }).notNull().default('vi'), // Ngôn ngữ giảng dạy: vi, en
  duration: integer('duration').notNull().default(4), // Thời gian đào tạo (năm)
  semesters: integer('semesters').notNull().default(8), // Số học kỳ
  totalCredits: integer('total_credits').notNull().default(130), // Số tín chỉ
  trainingType: varchar('training_type', { length: 50 }).notNull().default('chinh_quy'), // Loại hình đào tạo
  status: programStatusEnum('status').notNull().default('active'),
  year: integer('year').notNull(), // Năm áp dụng chương trình (2025, 2022, 2021)
  
  // Điều kiện tốt nghiệp (chung)
  minGpa: decimal('min_gpa', { precision: 3, scale: 2 }).default('2.00'), // Điểm TB tích lũy tối thiểu
  englishRequirement: varchar('english_requirement', { length: 100 }), // Yêu cầu tiếng Anh (TOEFL iBT 61, IELTS 5.0)
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Programs Vietnamese - Nội dung tiếng Việt
export const programsVi = pgTable('programs_vi', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  programName: varchar('program_name', { length: 255 }).notNull(), // Tên chương trình tiếng Việt
  degree: varchar('degree', { length: 255 }).notNull(), // Văn bằng tốt nghiệp tiếng Việt
  
  // Thông tin chung
  description: text('description'), // Mô tả tiếng Việt
  mission: text('mission'), // Sứ mạng tiếng Việt
  vision: text('vision'), // Tầm nhìn tiếng Việt
  coreValues: text('core_values'), // Giá trị cốt lõi tiếng Việt
  philosophy: text('philosophy'), // Triết lý giáo dục tiếng Việt
  
  // Mục tiêu và chuẩn đầu ra
  objectives: text('objectives'), // Mục tiêu chương trình tiếng Việt
  learningOutcomes: jsonb('learning_outcomes'), // Chuẩn đầu ra tiếng Việt
  
  // Điều kiện tốt nghiệp
  graduationRequirements: text('graduation_requirements'), // Điều kiện tốt nghiệp tiếng Việt
  
  // Thông tin tuyển sinh
  admissionInfo: text('admission_info'), // Thông tin tuyển sinh tiếng Việt
  
  // Cơ hội việc làm và học tập
  careerOpportunities: text('career_opportunities'), // Cơ hội việc làm tiếng Việt
  furtherStudy: text('further_study'), // Cơ hội học tập tiếp tiếng Việt
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Programs English - Nội dung tiếng Anh (được dịch từ tiếng Việt)
export const programsEn = pgTable('programs_en', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  programName: varchar('program_name', { length: 255 }).notNull(), // Tên chương trình tiếng Anh
  degree: varchar('degree', { length: 255 }).notNull(), // Văn bằng tốt nghiệp tiếng Anh
  
  // Thông tin chung
  description: text('description'), // Mô tả tiếng Anh
  mission: text('mission'), // Sứ mạng tiếng Anh
  vision: text('vision'), // Tầm nhìn tiếng Anh
  coreValues: text('core_values'), // Giá trị cốt lõi tiếng Anh
  philosophy: text('philosophy'), // Triết lý giáo dục tiếng Anh
  
  // Mục tiêu và chuẩn đầu ra
  objectives: text('objectives'), // Mục tiêu chương trình tiếng Anh
  learningOutcomes: jsonb('learning_outcomes'), // Chuẩn đầu ra tiếng Anh
  
  // Điều kiện tốt nghiệp
  graduationRequirements: text('graduation_requirements'), // Điều kiện tốt nghiệp tiếng Anh
  
  // Thông tin tuyển sinh
  admissionInfo: text('admission_info'), // Thông tin tuyển sinh tiếng Anh
  
  // Cơ hội việc làm và học tập
  careerOpportunities: text('career_opportunities'), // Cơ hội việc làm tiếng Anh
  furtherStudy: text('further_study'), // Cơ hội học tập tiếp tiếng Anh
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Program Structure Vietnamese - Cấu trúc chương trình tiếng Việt
export const programStructuresVi = pgTable('program_structures_vi', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên khối kiến thức tiếng Việt (VD: Kiến thức giáo dục đại cương)
  description: text('description'), // Mô tả tiếng Việt
  credits: integer('credits').notNull().default(0), // Số tín chỉ của khối
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Program Structure English - Cấu trúc chương trình tiếng Anh
export const programStructuresEn = pgTable('program_structures_en', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên khối kiến thức tiếng Anh
  description: text('description'), // Mô tả tiếng Anh
  credits: integer('credits').notNull().default(0), // Số tín chỉ của khối
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Courses Vietnamese - Môn học tiếng Việt
export const coursesVi = pgTable('courses_vi', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 20 }).notNull().unique(), // Mã môn học
  name: varchar('name', { length: 255 }).notNull(), // Tên môn học tiếng Việt
  description: text('description'), // Mô tả tiếng Việt
  credits: integer('credits').notNull().default(3), // Số tín chỉ
  theoryHours: integer('theory_hours').default(0), // Số giờ lý thuyết
  practiceHours: integer('practice_hours').default(0), // Số giờ thực hành
  selfStudyHours: integer('self_study_hours').default(0), // Số giờ tự học
  courseType: courseTypeEnum('course_type').notNull().default('compulsory'), // Loại môn học
  prerequisites: jsonb('prerequisites'), // Môn học tiên quyết
  learningOutcomes: jsonb('learning_outcomes'), // Chuẩn đầu ra môn học tiếng Việt
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Courses English - Môn học tiếng Anh
export const coursesEn = pgTable('courses_en', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 20 }).notNull().unique(), // Mã môn học
  name: varchar('name', { length: 255 }).notNull(), // Tên môn học tiếng Anh
  description: text('description'), // Mô tả tiếng Anh
  credits: integer('credits').notNull().default(3), // Số tín chỉ
  theoryHours: integer('theory_hours').default(0), // Số giờ lý thuyết
  practiceHours: integer('practice_hours').default(0), // Số giờ thực hành
  selfStudyHours: integer('self_study_hours').default(0), // Số giờ tự học
  courseType: courseTypeEnum('course_type').notNull().default('compulsory'), // Loại môn học
  prerequisites: jsonb('prerequisites'), // Môn học tiên quyết
  learningOutcomes: jsonb('learning_outcomes'), // Chuẩn đầu ra môn học tiếng Anh
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Program Courses - Môn học trong chương trình (liên kết chung)
export const programCourses = pgTable('program_courses', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  courseCode: varchar('course_code', { length: 20 }).notNull(), // Mã môn học (liên kết với courses_vi.code và courses_en.code)
  programStructureId: integer('program_structure_id').references(() => programStructuresVi.id, { onDelete: 'cascade' }), // ID của program structure (bắt buộc)
  semester: semesterEnum('semester').notNull(), // Học kỳ
  isRequired: boolean('is_required').notNull().default(true), // Bắt buộc hay không
  order: integer('order').notNull().default(0), // Thứ tự trong học kỳ
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Graduation Requirements Vietnamese - Yêu cầu tốt nghiệp tiếng Việt
export const graduationRequirementsVi = pgTable('graduation_requirements_vi', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên yêu cầu tiếng Việt
  description: text('description'), // Mô tả tiếng Việt
  isRequired: boolean('is_required').notNull().default(true), // Bắt buộc hay không
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Graduation Requirements English - Yêu cầu tốt nghiệp tiếng Anh
export const graduationRequirementsEn = pgTable('graduation_requirements_en', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên yêu cầu tiếng Anh
  description: text('description'), // Mô tả tiếng Anh
  isRequired: boolean('is_required').notNull().default(true), // Bắt buộc hay không
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Internship Programs Vietnamese - Chương trình thực tập tiếng Việt
export const internshipProgramsVi = pgTable('internship_programs_vi', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên chương trình thực tập tiếng Việt
  description: text('description'), // Mô tả tiếng Việt
  duration: integer('duration').default(0), // Thời gian thực tập (tuần)
  credits: integer('credits').default(0), // Số tín chỉ
  isRequired: boolean('is_required').notNull().default(true), // Bắt buộc hay không
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Internship Programs English - Chương trình thực tập tiếng Anh
export const internshipProgramsEn = pgTable('internship_programs_en', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(), // Tên chương trình thực tập tiếng Anh
  description: text('description'), // Mô tả tiếng Anh
  duration: integer('duration').default(0), // Thời gian thực tập (tuần)
  credits: integer('credits').default(0), // Số tín chỉ
  isRequired: boolean('is_required').notNull().default(true), // Bắt buộc hay không
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Program Documents Vietnamese - Tài liệu chương trình tiếng Việt
export const programDocumentsVi = pgTable('program_documents_vi', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(), // Tiêu đề tài liệu tiếng Việt
  description: text('description'), // Mô tả tiếng Việt
  fileUrl: varchar('file_url', { length: 500 }), // URL file tài liệu
  fileType: varchar('file_type', { length: 50 }), // Loại file (PDF, DOC, etc.)
  fileSize: integer('file_size'), // Kích thước file (bytes)
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Program Documents English - Tài liệu chương trình tiếng Anh
export const programDocumentsEn = pgTable('program_documents_en', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').notNull().references(() => programs.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(), // Tiêu đề tài liệu tiếng Anh
  description: text('description'), // Mô tả tiếng Anh
  fileUrl: varchar('file_url', { length: 500 }), // URL file tài liệu
  fileType: varchar('file_type', { length: 50 }), // Loại file (PDF, DOC, etc.)
  fileSize: integer('file_size'), // Kích thước file (bytes)
  order: integer('order').notNull().default(0), // Thứ tự hiển thị
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Translation Jobs - Công việc dịch thuật (để track việc dịch bằng OpenAI)
export const translationJobs = pgTable('translation_jobs', {
  id: serial('id').primaryKey(),
  sourceTable: varchar('source_table', { length: 50 }).notNull(), // Bảng nguồn (programs_vi, courses_vi, etc.)
  sourceId: integer('source_id').notNull(), // ID của record nguồn
  targetTable: varchar('target_table', { length: 50 }).notNull(), // Bảng đích (programs_en, courses_en, etc.)
  targetId: integer('target_id'), // ID của record đích (sau khi tạo)
  field: varchar('field', { length: 100 }).notNull(), // Trường cần dịch
  sourceContent: text('source_content').notNull(), // Nội dung gốc tiếng Việt
  translatedContent: text('translated_content'), // Nội dung đã dịch tiếng Anh
  status: translationStatusEnum('status').notNull().default('pending'), // Trạng thái dịch thuật
  openaiModel: varchar('openai_model', { length: 50 }).default('gpt-3.5-turbo'), // Model OpenAI sử dụng
  openaiResponse: jsonb('openai_response'), // Response từ OpenAI
  errorMessage: text('error_message'), // Lỗi nếu có
  retryCount: integer('retry_count').default(0), // Số lần retry
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

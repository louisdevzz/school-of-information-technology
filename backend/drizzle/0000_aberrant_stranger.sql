CREATE TYPE "public"."course_type" AS ENUM('compulsory', 'elective', 'optional');--> statement-breakpoint
CREATE TYPE "public"."degree_type" AS ENUM('bachelor', 'master', 'phd');--> statement-breakpoint
CREATE TYPE "public"."education_level" AS ENUM('undergraduate', 'postgraduate');--> statement-breakpoint
CREATE TYPE "public"."program_status" AS ENUM('draft', 'active', 'inactive', 'archived');--> statement-breakpoint
CREATE TYPE "public"."semester" AS ENUM('1', '2', '3', '4', '5', '6', '7', '8');--> statement-breakpoint
CREATE TYPE "public"."translation_status" AS ENUM('pending', 'translated', 'reviewed', 'approved');--> statement-breakpoint
CREATE TABLE "courses_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"credits" integer DEFAULT 3 NOT NULL,
	"theory_hours" integer DEFAULT 0,
	"practice_hours" integer DEFAULT 0,
	"self_study_hours" integer DEFAULT 0,
	"course_type" "course_type" DEFAULT 'compulsory' NOT NULL,
	"prerequisites" jsonb,
	"learning_outcomes" jsonb,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "courses_en_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "courses_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"credits" integer DEFAULT 3 NOT NULL,
	"theory_hours" integer DEFAULT 0,
	"practice_hours" integer DEFAULT 0,
	"self_study_hours" integer DEFAULT 0,
	"course_type" "course_type" DEFAULT 'compulsory' NOT NULL,
	"prerequisites" jsonb,
	"learning_outcomes" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "courses_vi_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "education_levels" (
	"id" serial PRIMARY KEY NOT NULL,
	"level" "education_level" NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "education_levels_level_unique" UNIQUE("level")
);
--> statement-breakpoint
CREATE TABLE "education_levels_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"education_level_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "education_levels_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"education_level_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "graduation_requirements_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"is_required" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "graduation_requirements_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"is_required" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internship_programs_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"duration" integer DEFAULT 0,
	"credits" integer DEFAULT 0,
	"is_required" boolean DEFAULT true NOT NULL,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "internship_programs_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"duration" integer DEFAULT 0,
	"credits" integer DEFAULT 0,
	"is_required" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "majors" (
	"id" serial PRIMARY KEY NOT NULL,
	"education_level_id" integer NOT NULL,
	"code" varchar(20) NOT NULL,
	"degree_type" "degree_type" NOT NULL,
	"status" "program_status" DEFAULT 'active' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "majors_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "majors_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"major_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "majors_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"major_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"course_code" varchar(20) NOT NULL,
	"program_structure_id" integer,
	"semester" "semester" NOT NULL,
	"is_required" boolean DEFAULT true NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_documents_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"file_url" varchar(500),
	"file_type" varchar(50),
	"file_size" integer,
	"order" integer DEFAULT 0 NOT NULL,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_documents_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"file_url" varchar(500),
	"file_type" varchar(50),
	"file_size" integer,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_structures_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"credits" integer DEFAULT 0 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "program_structures_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"credits" integer DEFAULT 0 NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"major_id" integer NOT NULL,
	"code" varchar(20) NOT NULL,
	"version" varchar(50) NOT NULL,
	"language" varchar(20) DEFAULT 'vi' NOT NULL,
	"duration" integer DEFAULT 4 NOT NULL,
	"semesters" integer DEFAULT 8 NOT NULL,
	"total_credits" integer DEFAULT 130 NOT NULL,
	"training_type" varchar(50) DEFAULT 'chinh_quy' NOT NULL,
	"status" "program_status" DEFAULT 'active' NOT NULL,
	"year" integer NOT NULL,
	"min_gpa" numeric(3, 2) DEFAULT '2.00',
	"english_requirement" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "programs_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "programs_en" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"program_name" varchar(255) NOT NULL,
	"degree" varchar(255) NOT NULL,
	"description" text,
	"mission" text,
	"vision" text,
	"core_values" text,
	"philosophy" text,
	"objectives" text,
	"learning_outcomes" jsonb,
	"graduation_requirements" text,
	"admission_info" text,
	"career_opportunities" text,
	"further_study" text,
	"translation_status" "translation_status" DEFAULT 'pending' NOT NULL,
	"translated_at" timestamp,
	"reviewed_at" timestamp,
	"approved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programs_vi" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"program_name" varchar(255) NOT NULL,
	"degree" varchar(255) NOT NULL,
	"description" text,
	"mission" text,
	"vision" text,
	"core_values" text,
	"philosophy" text,
	"objectives" text,
	"learning_outcomes" jsonb,
	"graduation_requirements" text,
	"admission_info" text,
	"career_opportunities" text,
	"further_study" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "translation_jobs" (
	"id" serial PRIMARY KEY NOT NULL,
	"source_table" varchar(50) NOT NULL,
	"source_id" integer NOT NULL,
	"target_table" varchar(50) NOT NULL,
	"target_id" integer,
	"field" varchar(100) NOT NULL,
	"source_content" text NOT NULL,
	"translated_content" text,
	"status" "translation_status" DEFAULT 'pending' NOT NULL,
	"openai_model" varchar(50) DEFAULT 'gpt-3.5-turbo',
	"openai_response" jsonb,
	"error_message" text,
	"retry_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "education_levels_en" ADD CONSTRAINT "education_levels_en_education_level_id_education_levels_id_fk" FOREIGN KEY ("education_level_id") REFERENCES "public"."education_levels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "education_levels_vi" ADD CONSTRAINT "education_levels_vi_education_level_id_education_levels_id_fk" FOREIGN KEY ("education_level_id") REFERENCES "public"."education_levels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "graduation_requirements_en" ADD CONSTRAINT "graduation_requirements_en_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "graduation_requirements_vi" ADD CONSTRAINT "graduation_requirements_vi_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internship_programs_en" ADD CONSTRAINT "internship_programs_en_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "internship_programs_vi" ADD CONSTRAINT "internship_programs_vi_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "majors" ADD CONSTRAINT "majors_education_level_id_education_levels_id_fk" FOREIGN KEY ("education_level_id") REFERENCES "public"."education_levels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "majors_en" ADD CONSTRAINT "majors_en_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "majors_vi" ADD CONSTRAINT "majors_vi_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_courses" ADD CONSTRAINT "program_courses_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_documents_en" ADD CONSTRAINT "program_documents_en_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_documents_vi" ADD CONSTRAINT "program_documents_vi_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_structures_en" ADD CONSTRAINT "program_structures_en_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "program_structures_vi" ADD CONSTRAINT "program_structures_vi_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programs" ADD CONSTRAINT "programs_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programs_en" ADD CONSTRAINT "programs_en_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programs_vi" ADD CONSTRAINT "programs_vi_program_id_programs_id_fk" FOREIGN KEY ("program_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
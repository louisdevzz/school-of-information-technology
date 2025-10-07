ALTER TABLE "majors_en" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "majors_en" ADD COLUMN "training_objectives" text;--> statement-breakpoint
ALTER TABLE "majors_en" ADD COLUMN "learning_outcomes" jsonb;--> statement-breakpoint
ALTER TABLE "majors_en" ADD COLUMN "career_opportunities" text;--> statement-breakpoint
ALTER TABLE "majors_en" ADD COLUMN "graduation_requirements" text;--> statement-breakpoint
ALTER TABLE "majors_vi" ADD COLUMN "slug" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "majors_vi" ADD COLUMN "training_objectives" text;--> statement-breakpoint
ALTER TABLE "majors_vi" ADD COLUMN "learning_outcomes" jsonb;--> statement-breakpoint
ALTER TABLE "majors_vi" ADD COLUMN "career_opportunities" text;--> statement-breakpoint
ALTER TABLE "majors_vi" ADD COLUMN "graduation_requirements" text;--> statement-breakpoint
ALTER TABLE "majors_en" ADD CONSTRAINT "majors_en_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "majors_vi" ADD CONSTRAINT "majors_vi_slug_unique" UNIQUE("slug");
import { IsString, IsEnum, IsOptional, IsInt, Min, Max, IsObject } from 'class-validator';
import { CourseType } from '../../../common/dto/base.dto';

// Create Course (Vietnamese + Auto-translate to English)
export class CreateCourseDto {
  @IsString()
  code: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  credits?: number = 3;

  @IsOptional()
  @IsInt()
  @Min(0)
  theoryHours?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  practiceHours?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  selfStudyHours?: number = 0;

  @IsOptional()
  @IsEnum(CourseType)
  courseType?: CourseType = CourseType.COMPULSORY;

  @IsOptional()
  @IsObject()
  prerequisites?: any;

  // Vietnamese content
  @IsString()
  nameVi: string;

  @IsOptional()
  @IsString()
  descriptionVi?: string;

  @IsOptional()
  @IsObject()
  learningOutcomesVi?: any;
}

// Update Course Base
export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  credits?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  theoryHours?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  practiceHours?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  selfStudyHours?: number;

  @IsOptional()
  @IsEnum(CourseType)
  courseType?: CourseType;

  @IsOptional()
  @IsObject()
  prerequisites?: any;
}

// Update Course Vietnamese
export class UpdateCourseViDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  learningOutcomes?: any;
}

// Update Course English
export class UpdateCourseEnDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  learningOutcomes?: any;
}

// Response DTOs
export class CourseResponseDto {
  id: number;
  code: string;
  credits: number;
  theoryHours?: number;
  practiceHours?: number;
  selfStudyHours?: number;
  courseType: CourseType;
  prerequisites?: any;
  createdAt: Date;
  updatedAt: Date;
}

export class CourseViResponseDto {
  id: number;
  code: string;
  name: string;
  description?: string;
  credits: number;
  theoryHours?: number;
  practiceHours?: number;
  selfStudyHours?: number;
  courseType: CourseType;
  prerequisites?: any;
  learningOutcomes?: any;
  createdAt: Date;
  updatedAt: Date;
}

export class CourseEnResponseDto {
  id: number;
  code: string;
  name: string;
  description?: string;
  credits: number;
  theoryHours?: number;
  practiceHours?: number;
  selfStudyHours?: number;
  courseType: CourseType;
  prerequisites?: any;
  learningOutcomes?: any;
  createdAt: Date;
  updatedAt: Date;
}
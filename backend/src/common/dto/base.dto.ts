import { IsOptional, IsString, IsInt, IsEnum, IsBoolean, IsArray, IsObject, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export enum TranslationStatus {
  PENDING = 'pending',
  TRANSLATED = 'translated',
  REVIEWED = 'reviewed',
  APPROVED = 'approved',
}

export enum ProgramStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum EducationLevel {
  UNDERGRADUATE = 'undergraduate',
  POSTGRADUATE = 'postgraduate',
}

export enum DegreeType {
  BACHELOR = 'bachelor',
  MASTER = 'master',
  PHD = 'phd',
}

export enum CourseType {
  COMPULSORY = 'compulsory',
  ELECTIVE = 'elective',
  OPTIONAL = 'optional',
}

export enum Semester {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
}

// Base pagination DTO
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

// Base response DTO
export class BaseResponseDto<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Translation tracking DTO
export class TranslationTrackingDto {
  @IsEnum(TranslationStatus)
  status: TranslationStatus;

  @IsOptional()
  @IsString()
  translatedAt?: string;

  @IsOptional()
  @IsString()
  reviewedAt?: string;

  @IsOptional()
  @IsString()
  approvedAt?: string;
}

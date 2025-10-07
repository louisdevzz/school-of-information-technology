import { IsString, IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { EducationLevel } from '../../../common/dto/base.dto';

// Create Education Level (Vietnamese + Auto-translate to English)
export class CreateEducationLevelDto {
  @IsEnum(EducationLevel)
  level: EducationLevel;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number = 0;

  // Vietnamese content
  @IsString()
  nameVi: string;

  @IsOptional()
  @IsString()
  descriptionVi?: string;
}

// Update Education Level Base
export class UpdateEducationLevelDto {
  @IsOptional()
  @IsEnum(EducationLevel)
  level?: EducationLevel;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

// Update Education Level Vietnamese
export class UpdateEducationLevelViDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

// Update Education Level English
export class UpdateEducationLevelEnDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

// Response DTOs
export class EducationLevelResponseDto {
  id: number;
  level: EducationLevel;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  vietnamese?: EducationLevelViResponseDto;
  english?: EducationLevelEnResponseDto;
}

export class EducationLevelViResponseDto {
  id: number;
  educationLevelId: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class EducationLevelEnResponseDto {
  id: number;
  educationLevelId: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

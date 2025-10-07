import { IsString, IsEnum, IsOptional, IsInt, Min, IsObject } from 'class-validator';
import { ProgramStatus, DegreeType, TranslationStatus } from '../../../common/dto/base.dto';

// Create Major (Vietnamese + Auto-translate to English)
export class CreateMajorDto {
  @IsInt()
  educationLevelId: number;

  @IsString()
  code: string;

  @IsEnum(DegreeType)
  degreeType: DegreeType;

  @IsOptional()
  @IsEnum(ProgramStatus)
  status?: ProgramStatus = ProgramStatus.ACTIVE;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number = 0;

  // Vietnamese content
  @IsString()
  nameVi: string;

  @IsOptional()
  @IsString()
  slugVi?: string; // Auto-generated from nameVi if not provided

  @IsOptional()
  @IsString()
  descriptionVi?: string;

  // Mục tiêu đào tạo
  @IsOptional()
  @IsString()
  trainingObjectivesVi?: string;

  // Chuẩn đầu ra (JSON format)
  @IsOptional()
  @IsObject()
  learningOutcomesVi?: any;

  // Vị trí làm việc sau khi tốt nghiệp
  @IsOptional()
  @IsString()
  careerOpportunitiesVi?: string;

  // Điều kiện tốt nghiệp
  @IsOptional()
  @IsString()
  graduationRequirementsVi?: string;
}

// Update Major Base
export class UpdateMajorDto {
  @IsOptional()
  @IsInt()
  educationLevelId?: number;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(DegreeType)
  degreeType?: DegreeType;

  @IsOptional()
  @IsEnum(ProgramStatus)
  status?: ProgramStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

// Update Major Vietnamese
export class UpdateMajorViDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Mục tiêu đào tạo
  @IsOptional()
  @IsString()
  trainingObjectives?: string;

  // Chuẩn đầu ra (JSON format)
  @IsOptional()
  @IsObject()
  learningOutcomes?: any;

  // Vị trí làm việc sau khi tốt nghiệp
  @IsOptional()
  @IsString()
  careerOpportunities?: string;

  // Điều kiện tốt nghiệp
  @IsOptional()
  @IsString()
  graduationRequirements?: string;
}

// Update Major English
export class UpdateMajorEnDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Mục tiêu đào tạo
  @IsOptional()
  @IsString()
  trainingObjectives?: string;

  // Chuẩn đầu ra (JSON format)
  @IsOptional()
  @IsObject()
  learningOutcomes?: any;

  // Vị trí làm việc sau khi tốt nghiệp
  @IsOptional()
  @IsString()
  careerOpportunities?: string;

  // Điều kiện tốt nghiệp
  @IsOptional()
  @IsString()
  graduationRequirements?: string;
}

// Response DTOs
export class MajorResponseDto {
  id: number;
  educationLevelId: number;
  code: string;
  degreeType: DegreeType;
  status: ProgramStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  vietnamese?: MajorViResponseDto;
  english?: MajorEnResponseDto;
}

export class MajorViResponseDto {
  id: number;
  majorId: number;
  name: string;
  slug: string;
  description?: string;
  trainingObjectives?: string;
  learningOutcomes?: any;
  careerOpportunities?: string;
  graduationRequirements?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MajorEnResponseDto {
  id: number;
  majorId: number;
  name: string;
  slug: string;
  description?: string;
  trainingObjectives?: string;
  learningOutcomes?: any;
  careerOpportunities?: string;
  graduationRequirements?: string;
  createdAt: Date;
  updatedAt: Date;
}

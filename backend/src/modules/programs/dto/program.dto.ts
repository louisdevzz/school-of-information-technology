import { IsString, IsEnum, IsOptional, IsInt, Min, Max, IsDecimal } from 'class-validator';
import { ProgramStatus } from '../../../common/dto/base.dto';

// Create Program (Vietnamese + Auto-translate to English)
export class CreateProgramDto {
  @IsInt()
  majorId: number;

  @IsString()
  code: string;

  @IsString()
  version: string;

  @IsOptional()
  @IsString()
  language?: string = 'vi';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  duration?: number = 4;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  semesters?: number = 8;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(500)
  totalCredits?: number = 130;

  @IsOptional()
  @IsString()
  trainingType?: string = 'chinh_quy';

  @IsOptional()
  @IsEnum(ProgramStatus)
  status?: ProgramStatus = ProgramStatus.ACTIVE;

  @IsInt()
  year: number;

  @IsOptional()
  @IsDecimal()
  minGpa?: string = '2.00';

  @IsOptional()
  @IsString()
  englishRequirement?: string;

  // Vietnamese content
  @IsString()
  programNameVi: string;

  @IsString()
  degreeVi: string;

  @IsOptional()
  @IsString()
  descriptionVi?: string;

  @IsOptional()
  @IsString()
  missionVi?: string;

  @IsOptional()
  @IsString()
  visionVi?: string;

  @IsOptional()
  @IsString()
  coreValuesVi?: string;

  @IsOptional()
  @IsString()
  philosophyVi?: string;

  @IsOptional()
  @IsString()
  objectivesVi?: string;

  @IsOptional()
  learningOutcomesVi?: any;

  @IsOptional()
  @IsString()
  graduationRequirementsVi?: string;

  @IsOptional()
  @IsString()
  admissionInfoVi?: string;

  @IsOptional()
  @IsString()
  careerOpportunitiesVi?: string;

  @IsOptional()
  @IsString()
  furtherStudyVi?: string;
}

// Update Program Base
export class UpdateProgramDto {
  @IsOptional()
  @IsInt()
  majorId?: number;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  duration?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  semesters?: number;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(500)
  totalCredits?: number;

  @IsOptional()
  @IsString()
  trainingType?: string;

  @IsOptional()
  @IsEnum(ProgramStatus)
  status?: ProgramStatus;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsDecimal()
  minGpa?: string;

  @IsOptional()
  @IsString()
  englishRequirement?: string;
}

// Update Program Vietnamese
export class UpdateProgramViDto {
  @IsOptional()
  @IsString()
  programName?: string;

  @IsOptional()
  @IsString()
  degree?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mission?: string;

  @IsOptional()
  @IsString()
  vision?: string;

  @IsOptional()
  @IsString()
  coreValues?: string;

  @IsOptional()
  @IsString()
  philosophy?: string;

  @IsOptional()
  @IsString()
  objectives?: string;

  @IsOptional()
  learningOutcomes?: any;

  @IsOptional()
  @IsString()
  graduationRequirements?: string;

  @IsOptional()
  @IsString()
  admissionInfo?: string;

  @IsOptional()
  @IsString()
  careerOpportunities?: string;

  @IsOptional()
  @IsString()
  furtherStudy?: string;
}

// Update Program English
export class UpdateProgramEnDto {
  @IsOptional()
  @IsString()
  programName?: string;

  @IsOptional()
  @IsString()
  degree?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mission?: string;

  @IsOptional()
  @IsString()
  vision?: string;

  @IsOptional()
  @IsString()
  coreValues?: string;

  @IsOptional()
  @IsString()
  philosophy?: string;

  @IsOptional()
  @IsString()
  objectives?: string;

  @IsOptional()
  learningOutcomes?: any;

  @IsOptional()
  @IsString()
  graduationRequirements?: string;

  @IsOptional()
  @IsString()
  admissionInfo?: string;

  @IsOptional()
  @IsString()
  careerOpportunities?: string;

  @IsOptional()
  @IsString()
  furtherStudy?: string;
}

// Response DTOs
export class ProgramResponseDto {
  id: number;
  majorId: number;
  code: string;
  version: string;
  language: string;
  duration: number;
  semesters: number;
  totalCredits: number;
  trainingType: string;
  status: ProgramStatus;
  year: number;
  minGpa?: string;
  englishRequirement?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProgramViResponseDto {
  id: number;
  programId: number;
  programName: string;
  degree: string;
  description?: string;
  mission?: string;
  vision?: string;
  coreValues?: string;
  philosophy?: string;
  objectives?: string;
  learningOutcomes?: any;
  graduationRequirements?: string;
  admissionInfo?: string;
  careerOpportunities?: string;
  furtherStudy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class ProgramEnResponseDto {
  id: number;
  programId: number;
  programName: string;
  degree: string;
  description?: string;
  mission?: string;
  vision?: string;
  coreValues?: string;
  philosophy?: string;
  objectives?: string;
  learningOutcomes?: any;
  graduationRequirements?: string;
  admissionInfo?: string;
  careerOpportunities?: string;
  furtherStudy?: string;
  createdAt: Date;
  updatedAt: Date;
}
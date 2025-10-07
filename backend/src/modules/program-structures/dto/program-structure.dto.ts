import { IsString, IsEnum, IsOptional, IsInt, Min } from 'class-validator';

// Create Program Structure (Vietnamese + Auto-translate to English)
export class CreateProgramStructureDto {
  @IsInt()
  programId: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits?: number = 0;

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

// Update Program Structure Base
export class UpdateProgramStructureDto {
  @IsOptional()
  @IsInt()
  programId?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

// Update Program Structure Vietnamese
export class UpdateProgramStructureViDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

// Update Program Structure English
export class UpdateProgramStructureEnDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}

// Response DTOs
export class ProgramStructureResponseDto {
  id: number;
  programId: number;
  credits: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProgramStructureViResponseDto {
  id: number;
  programId: number;
  name: string;
  description?: string;
  credits: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ProgramStructureEnResponseDto {
  id: number;
  programId: number;
  name: string;
  description?: string;
  credits: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
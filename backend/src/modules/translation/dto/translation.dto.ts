import { IsString, IsEnum, IsOptional, IsInt, IsArray } from 'class-validator';
import { TranslationStatus } from '../../../common/dto/base.dto';

export class CreateTranslationJobDto {
  @IsString()
  sourceTable: string;

  @IsInt()
  sourceId: number;

  @IsString()
  targetTable: string;

  @IsString()
  field: string;

  @IsString()
  sourceContent: string;

  @IsOptional()
  @IsString()
  context?: string;
}

export class ProcessTranslationDto {
  @IsInt()
  jobId: number;
}

export class UpdateTranslationStatusDto {
  @IsEnum(TranslationStatus)
  status: TranslationStatus;

  @IsOptional()
  @IsString()
  reviewedBy?: string;
}

export class BatchTranslateDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sourceTables?: string[];

  @IsOptional()
  @IsEnum(TranslationStatus)
  status?: TranslationStatus;
}

export class TranslationJobResponseDto {
  id: number;
  sourceTable: string;
  sourceId: number;
  targetTable: string;
  targetId?: number;
  field: string;
  sourceContent: string;
  translatedContent?: string;
  status: TranslationStatus;
  openaiModel: string;
  openaiResponse?: any;
  errorMessage?: string;
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export class TranslationResultDto {
  jobId: number;
  translatedContent?: string;
  status?: TranslationStatus;
  error?: string;
}

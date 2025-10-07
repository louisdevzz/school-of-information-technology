import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  Query, 
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import {
  CreateTranslationJobDto,
  ProcessTranslationDto,
  UpdateTranslationStatusDto,
  BatchTranslateDto,
  TranslationJobResponseDto,
} from './dto/translation.dto';
import { TranslationStatus } from '../../common/dto/base.dto';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post('jobs')
  @HttpCode(HttpStatus.CREATED)
  async createTranslationJob(@Body() createJobDto: CreateTranslationJobDto) {
    const result = await this.translationService.createTranslationJob(
      createJobDto.sourceTable,
      createJobDto.sourceId,
      createJobDto.targetTable,
      createJobDto.field,
      createJobDto.sourceContent,
      createJobDto.context,
    );
    
    return {
      success: true,
      data: result,
      message: 'Translation job created successfully',
    };
  }

  @Post('process/:jobId')
  @HttpCode(HttpStatus.OK)
  async processTranslationJob(
    @Param('jobId', ParseIntPipe) jobId: number,
  ) {
    const result = await this.translationService.processTranslationJob(jobId);
    
    return {
      success: true,
      data: result,
      message: 'Translation job processed successfully',
    };
  }

  @Post('batch')
  @HttpCode(HttpStatus.OK)
  async batchTranslate(@Body() batchDto: BatchTranslateDto) {
    const results = await this.translationService.batchTranslateEducationLevels();
    
    return {
      success: true,
      data: results,
      message: `Processed ${results.length} translation jobs`,
    };
  }

  @Get('jobs')
  async getTranslationJobs(@Query('status') status?: TranslationStatus) {
    const results = await this.translationService.getTranslationJobs(status);
    
    return {
      success: true,
      data: results,
    };
  }

  @Put('jobs/:jobId/status')
  async updateTranslationStatus(
    @Param('jobId', ParseIntPipe) jobId: number,
    @Body() updateStatusDto: UpdateTranslationStatusDto,
  ) {
    const result = await this.translationService.updateTranslationStatus(
      jobId,
      updateStatusDto.status,
      updateStatusDto.reviewedBy,
    );
    
    return {
      success: true,
      data: result,
      message: 'Translation status updated successfully',
    };
  }

  @Post('translate-text')
  @HttpCode(HttpStatus.OK)
  async translateText(
    @Body() body: { text: string; context?: string },
  ) {
    const result = await this.translationService.translateText(
      body.text,
      'vi',
      'en',
      body.context,
    );
    
    return {
      success: true,
      data: { translatedText: result },
      message: 'Text translated successfully',
    };
  }
}

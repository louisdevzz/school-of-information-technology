import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import OpenAI from 'openai';
import { eq } from 'drizzle-orm';
import { translationJobs, translationStatusEnum } from '../../../db/schema';
import { TranslationStatus } from '../../common/dto/base.dto';

@Injectable()
export class TranslationService {
  private readonly logger = new Logger(TranslationService.name);
  private openai: OpenAI;

  constructor(
    private configService: ConfigService,
    @Inject('DRIZZLE_DB') private db: any,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not defined');
    }
    
    this.openai = new OpenAI({
      apiKey,
    });
  }

  async translateText(
    text: string,
    sourceLanguage: string = 'vi',
    targetLanguage: string = 'en',
    context?: string,
  ): Promise<string> {
    try {
      const systemPrompt = `You are a professional translator specializing in academic and educational content. 
      Translate the following ${sourceLanguage} text to ${targetLanguage} while maintaining:
      - Academic tone and formality
      - Technical accuracy
      - Cultural context appropriateness
      - Professional terminology consistency
      
      ${context ? `Context: ${context}` : ''}
      
      Return only the translated text without any additional explanations or formatting.`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      return response.choices[0]?.message?.content?.trim() || '';
    } catch (error) {
      this.logger.error('Translation failed:', error);
      throw new Error(`Translation failed: ${error.message}`);
    }
  }

  async createTranslationJob(
    sourceTable: string,
    sourceId: number,
    targetTable: string,
    field: string,
    sourceContent: string,
    context?: string,
  ) {
    const [job] = await this.db
      .insert(translationJobs)
      .values({
        sourceTable,
        sourceId,
        targetTable,
        field,
        sourceContent,
        status: 'pending' as const,
        openaiModel: 'gpt-3.5-turbo',
      })
      .returning();

    return job;
  }

  async processTranslationJob(jobId: number) {
    const [job] = await this.db
      .select()
      .from(translationJobs)
      .where(eq(translationJobs.id, jobId));

    if (!job) {
      throw new Error('Translation job not found');
    }

    if (job.status !== 'pending') {
      throw new Error('Job is not in pending status');
    }

    try {
      // Update job status to processing
      await this.db
        .update(translationJobs)
        .set({ 
          status: 'translated' as const,
          retryCount: job.retryCount + 1,
        })
        .where(eq(translationJobs.id, jobId));

      // Translate the content
      const translatedContent = await this.translateText(
        job.sourceContent,
        'vi',
        'en',
        `Field: ${job.field}, Table: ${job.sourceTable}`,
      );

      // Update job with translated content
      await this.db
        .update(translationJobs)
        .set({
          translatedContent,
          status: 'translated' as const,
          translatedAt: new Date(),
          completedAt: new Date(),
        })
        .where(eq(translationJobs.id, jobId));

      return {
        jobId,
        translatedContent,
        status: 'translated' as const,
      };
    } catch (error) {
      // Update job with error
      await this.db
        .update(translationJobs)
        .set({
          status: 'pending' as const,
          errorMessage: error.message,
          retryCount: job.retryCount + 1,
        })
        .where(eq(translationJobs.id, jobId));

      throw error;
    }
  }

  async batchTranslateEducationLevels() {
    // Get all education levels that need translation
    const pendingJobs = await this.db
      .select()
      .from(translationJobs)
      .where(eq(translationJobs.status, 'pending'));

    const results: any[] = [];
    
    for (const job of pendingJobs) {
      try {
        const result = await this.processTranslationJob(job.id);
        results.push(result);
      } catch (error) {
        this.logger.error(`Failed to process job ${job.id}:`, error);
        results.push({
          jobId: job.id,
          error: error.message,
        });
      }
    }

    return results;
  }

  async getTranslationJobs(status?: TranslationStatus) {
    let query = this.db.select().from(translationJobs);
    
    if (status) {
      query = query.where(eq(translationJobs.status, status));
    }
    
    return await query.orderBy(translationJobs.createdAt);
  }

  async updateTranslationStatus(
    jobId: number,
    status: TranslationStatus,
    reviewedBy?: string,
  ) {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (status === 'reviewed') {
      updateData.reviewedAt = new Date();
    } else if (status === 'approved') {
      updateData.approvedAt = new Date();
    }

    const [result] = await this.db
      .update(translationJobs)
      .set(updateData)
      .where(eq(translationJobs.id, jobId))
      .returning();

    return result;
  }
}

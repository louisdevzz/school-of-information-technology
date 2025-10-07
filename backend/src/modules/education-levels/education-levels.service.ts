import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { 
  educationLevels, 
  educationLevelsVi, 
  educationLevelsEn,
  educationLevelEnum
} from '../../../db/schema';
import {
  CreateEducationLevelDto,
  UpdateEducationLevelDto,
  UpdateEducationLevelViDto,
  UpdateEducationLevelEnDto,
  EducationLevelResponseDto,
  EducationLevelViResponseDto,
  EducationLevelEnResponseDto,
} from './dto/education-level.dto';
import { PaginationDto } from '../../common/dto/base.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class EducationLevelsService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private translationService: TranslationService,
  ) {}

  async create(data: CreateEducationLevelDto) {
    try {
      // 1. Create base education level
      const [baseResult] = await this.db
        .insert(educationLevels)
        .values({
          level: data.level,
          order: data.order,
        })
        .returning();

      // 2. Create Vietnamese content
      const [viResult] = await this.db
        .insert(educationLevelsVi)
        .values({
          educationLevelId: baseResult.id,
          name: data.nameVi,
          description: data.descriptionVi,
        })
        .returning();

      // 3. Auto-translate to English (async)
      this.translateAndCreateEnglish(baseResult.id, data.nameVi, data.descriptionVi);

      return {
        base: baseResult,
        vietnamese: viResult,
      };
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('Education level with this type already exists');
      }
      throw error;
    }
  }

  private async translateAndCreateEnglish(educationLevelId: number, nameVi: string, descriptionVi?: string) {
    try {
      // Translate name
      const nameEn = await this.translationService.translateText(
        nameVi,
        'vi',
        'en',
        'Education level name'
      );

      // Translate description if exists
      let descriptionEn: string | undefined;
      if (descriptionVi) {
        descriptionEn = await this.translationService.translateText(
          descriptionVi,
          'vi',
          'en',
          'Education level description'
        );
      }

      // Create English content
      await this.db
        .insert(educationLevelsEn)
        .values({
          educationLevelId,
          name: nameEn,
          description: descriptionEn,
        })
        .returning();
    } catch (error) {
      console.error('Failed to translate education level:', error);
      // Don't throw error to avoid breaking the main create flow
    }
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const results = await this.db
      .select()
      .from(educationLevels)
      .leftJoin(educationLevelsVi, eq(educationLevels.id, educationLevelsVi.educationLevelId))
      .leftJoin(educationLevelsEn, eq(educationLevels.id, educationLevelsEn.educationLevelId))
      .orderBy(educationLevels.order, educationLevels.id)
      .limit(limit)
      .offset(offset);

    const total = await this.db
      .select({ count: educationLevels.id })
      .from(educationLevels);

    return {
      data: results.map(row => ({
        id: row.education_levels.id,
        level: row.education_levels.level,
        order: row.education_levels.order,
        createdAt: row.education_levels.createdAt,
        updatedAt: row.education_levels.updatedAt,
        vietnamese: row.education_levels_vi ? {
          id: row.education_levels_vi.id,
          educationLevelId: row.education_levels_vi.educationLevelId,
          name: row.education_levels_vi.name,
          description: row.education_levels_vi.description,
          createdAt: row.education_levels_vi.createdAt,
          updatedAt: row.education_levels_vi.updatedAt,
        } : null,
        english: row.education_levels_en ? {
          id: row.education_levels_en.id,
          educationLevelId: row.education_levels_en.educationLevelId,
          name: row.education_levels_en.name,
          description: row.education_levels_en.description,
          translationStatus: row.education_levels_en.translationStatus,
          translatedAt: row.education_levels_en.translatedAt,
          reviewedAt: row.education_levels_en.reviewedAt,
          approvedAt: row.education_levels_en.approvedAt,
          createdAt: row.education_levels_en.createdAt,
          updatedAt: row.education_levels_en.updatedAt,
        } : null,
      })),
      pagination: {
        page,
        limit,
        total: total.length,
        totalPages: Math.ceil(total.length / limit),
      },
    };
  }

  async findOne(id: number) {
    const [result] = await this.db
      .select()
      .from(educationLevels)
      .leftJoin(educationLevelsVi, eq(educationLevels.id, educationLevelsVi.educationLevelId))
      .leftJoin(educationLevelsEn, eq(educationLevels.id, educationLevelsEn.educationLevelId))
      .where(eq(educationLevels.id, id));

    if (!result) {
      throw new NotFoundException('Education level not found');
    }

    return {
      id: result.education_levels.id,
      level: result.education_levels.level,
      order: result.education_levels.order,
      createdAt: result.education_levels.createdAt,
      updatedAt: result.education_levels.updatedAt,
      vietnamese: result.education_levels_vi ? {
        id: result.education_levels_vi.id,
        educationLevelId: result.education_levels_vi.educationLevelId,
        name: result.education_levels_vi.name,
        description: result.education_levels_vi.description,
        createdAt: result.education_levels_vi.createdAt,
        updatedAt: result.education_levels_vi.updatedAt,
      } : null,
      english: result.education_levels_en ? {
        id: result.education_levels_en.id,
        educationLevelId: result.education_levels_en.educationLevelId,
        name: result.education_levels_en.name,
        description: result.education_levels_en.description,
        translationStatus: result.education_levels_en.translationStatus,
        translatedAt: result.education_levels_en.translatedAt,
        reviewedAt: result.education_levels_en.reviewedAt,
        approvedAt: result.education_levels_en.approvedAt,
        createdAt: result.education_levels_en.createdAt,
        updatedAt: result.education_levels_en.updatedAt,
      } : null,
    };
  }

  async updateBase(id: number, data: UpdateEducationLevelDto) {
    const [result] = await this.db
      .update(educationLevels)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(educationLevels.id, id))
      .returning();

    if (!result) {
      throw new NotFoundException('Education level not found');
    }

    return result;
  }

  async updateVietnamese(educationLevelId: number, data: UpdateEducationLevelViDto) {
    const [result] = await this.db
      .update(educationLevelsVi)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(educationLevelsVi.educationLevelId, educationLevelId))
      .returning();

    if (!result) {
      throw new NotFoundException('Vietnamese content not found');
    }

    return result;
  }

  async updateEnglish(educationLevelId: number, data: UpdateEducationLevelEnDto) {
    const [result] = await this.db
      .update(educationLevelsEn)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(educationLevelsEn.educationLevelId, educationLevelId))
      .returning();

    if (!result) {
      throw new NotFoundException('English content not found');
    }

    return result;
  }

  async remove(id: number) {
    const [result] = await this.db
      .delete(educationLevels)
      .where(eq(educationLevels.id, id))
      .returning();

    if (!result) {
      throw new NotFoundException('Education level not found');
    }

    return result;
  }
}

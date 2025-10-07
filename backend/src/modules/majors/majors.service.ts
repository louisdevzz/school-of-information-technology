import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { eq, or } from 'drizzle-orm';
import { majors, majorsVi, majorsEn } from '../../../db/schema';
import {
  CreateMajorDto,
  UpdateMajorDto,
  UpdateMajorViDto,
  UpdateMajorEnDto,
} from './dto/major.dto';
import { PaginationDto } from '../../common/dto/base.dto';
import { TranslationService } from '../translation/translation.service';
import { createSlug, generateUniqueSlug } from '../../common/utils/slug.util';

@Injectable()
export class MajorsService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private translationService: TranslationService,
  ) {}

  async create(data: CreateMajorDto) {
    try {
      // Generate Vietnamese slug if not provided
      let slugVi = data.slugVi;
      if (!slugVi) {
        slugVi = createSlug(data.nameVi);
      }

      // Check for existing Vietnamese slugs and make it unique
      const existingSlugsVi = await this.getExistingSlugsVi();
      slugVi = generateUniqueSlug(slugVi, existingSlugsVi);

      // 1. Create base major
      const [baseResult] = await this.db
        .insert(majors)
        .values({
          educationLevelId: data.educationLevelId,
          code: data.code,
          degreeType: data.degreeType,
          status: data.status,
          order: data.order,
        })
        .returning();

      // 2. Create Vietnamese content
      const [viResult] = await this.db
        .insert(majorsVi)
        .values({
          majorId: baseResult.id,
          name: data.nameVi,
          slug: slugVi,
          description: data.descriptionVi,
          trainingObjectives: data.trainingObjectivesVi,
          learningOutcomes: data.learningOutcomesVi,
          careerOpportunities: data.careerOpportunitiesVi,
          graduationRequirements: data.graduationRequirementsVi,
        })
        .returning();

      // 3. Auto-translate to English (async)
      this.translateAndCreateEnglish(baseResult.id, {
        nameVi: data.nameVi,
        descriptionVi: data.descriptionVi,
        trainingObjectivesVi: data.trainingObjectivesVi,
        learningOutcomesVi: data.learningOutcomesVi,
        careerOpportunitiesVi: data.careerOpportunitiesVi,
        graduationRequirementsVi: data.graduationRequirementsVi,
      });

      return {
        base: baseResult,
        vietnamese: viResult,
      };
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('Major with this code or slug already exists');
      }
      throw error;
    }
  }

  private async getExistingSlugsVi(): Promise<string[]> {
    const results = await this.db
      .select({ slug: majorsVi.slug })
      .from(majorsVi);
    
    return results.map(row => row.slug);
  }

  private async getExistingSlugsEn(): Promise<string[]> {
    const results = await this.db
      .select({ slug: majorsEn.slug })
      .from(majorsEn);
    
    return results.map(row => row.slug);
  }

  private async translateAndCreateEnglish(majorId: number, data: {
    nameVi: string;
    descriptionVi?: string;
    trainingObjectivesVi?: string;
    learningOutcomesVi?: any;
    careerOpportunitiesVi?: string;
    graduationRequirementsVi?: string;
  }) {
    try {
      // Translate all text fields
      const translations = await Promise.all([
        this.translationService.translateText(data.nameVi, 'vi', 'en', 'Major name'),
        data.descriptionVi ? this.translationService.translateText(data.descriptionVi, 'vi', 'en', 'Major description') : Promise.resolve(undefined),
        data.trainingObjectivesVi ? this.translationService.translateText(data.trainingObjectivesVi, 'vi', 'en', 'Training objectives') : Promise.resolve(undefined),
        data.careerOpportunitiesVi ? this.translationService.translateText(data.careerOpportunitiesVi, 'vi', 'en', 'Career opportunities') : Promise.resolve(undefined),
        data.graduationRequirementsVi ? this.translationService.translateText(data.graduationRequirementsVi, 'vi', 'en', 'Graduation requirements') : Promise.resolve(undefined),
      ]);

      const [nameEn, descriptionEn, trainingObjectivesEn, careerOpportunitiesEn, graduationRequirementsEn] = translations;

      // Generate English slug from translated name
      const slugEn = createSlug(nameEn);
      const existingSlugsEn = await this.getExistingSlugsEn();
      const uniqueSlugEn = generateUniqueSlug(slugEn, existingSlugsEn);

      // Translate learning outcomes if exists
      let learningOutcomesEn: any = undefined;
      if (data.learningOutcomesVi) {
        learningOutcomesEn = await this.translateLearningOutcomes(data.learningOutcomesVi);
      }

      // Create English content
      await this.db
        .insert(majorsEn)
        .values({
          majorId,
          name: nameEn,
          slug: uniqueSlugEn,
          description: descriptionEn,
          trainingObjectives: trainingObjectivesEn,
          learningOutcomes: learningOutcomesEn,
          careerOpportunities: careerOpportunitiesEn,
          graduationRequirements: graduationRequirementsEn,
        })
        .returning();
    } catch (error) {
      console.error('Failed to translate major:', error);
      // Don't throw error to avoid breaking the main create flow
    }
  }

  private async translateLearningOutcomes(learningOutcomesVi: any): Promise<any> {
    try {
      const translated = { ...learningOutcomesVi };

      // Translate knowledge section
      if (learningOutcomesVi.knowledge && Array.isArray(learningOutcomesVi.knowledge)) {
        translated.knowledge = await Promise.all(
          learningOutcomesVi.knowledge.map(async (item: any) => ({
            ...item,
            content: await this.translationService.translateText(item.content, 'vi', 'en', 'Learning outcome')
          }))
        );
      }

      // Translate skills section
      if (learningOutcomesVi.skills && Array.isArray(learningOutcomesVi.skills)) {
        translated.skills = await Promise.all(
          learningOutcomesVi.skills.map(async (item: any) => ({
            ...item,
            content: await this.translationService.translateText(item.content, 'vi', 'en', 'Learning outcome')
          }))
        );
      }

      // Translate autonomy section
      if (learningOutcomesVi.autonomy && Array.isArray(learningOutcomesVi.autonomy)) {
        translated.autonomy = await Promise.all(
          learningOutcomesVi.autonomy.map(async (item: any) => ({
            ...item,
            content: await this.translationService.translateText(item.content, 'vi', 'en', 'Learning outcome')
          }))
        );
      }

      return translated;
    } catch (error) {
      console.error('Failed to translate learning outcomes:', error);
      return learningOutcomesVi; // Return original if translation fails
    }
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const results = await this.db
      .select()
      .from(majors)
      .leftJoin(majorsVi, eq(majors.id, majorsVi.majorId))
      .leftJoin(majorsEn, eq(majors.id, majorsEn.majorId))
      .orderBy(majors.order, majors.id)
      .limit(limit)
      .offset(offset);

    const total = await this.db
      .select({ count: majors.id })
      .from(majors);

    return {
      data: results.map(row => ({
        id: row.majors.id,
        educationLevelId: row.majors.educationLevelId,
        code: row.majors.code,
        degreeType: row.majors.degreeType,
        status: row.majors.status,
        order: row.majors.order,
        createdAt: row.majors.createdAt,
        updatedAt: row.majors.updatedAt,
        vietnamese: row.majors_vi ? {
          id: row.majors_vi.id,
          majorId: row.majors_vi.majorId,
          name: row.majors_vi.name,
          slug: row.majors_vi.slug,
          description: row.majors_vi.description,
          trainingObjectives: row.majors_vi.trainingObjectives,
          learningOutcomes: row.majors_vi.learningOutcomes,
          careerOpportunities: row.majors_vi.careerOpportunities,
          graduationRequirements: row.majors_vi.graduationRequirements,
          createdAt: row.majors_vi.createdAt,
          updatedAt: row.majors_vi.updatedAt,
        } : null,
        english: row.majors_en ? {
          id: row.majors_en.id,
          majorId: row.majors_en.majorId,
          name: row.majors_en.name,
          slug: row.majors_en.slug,
          description: row.majors_en.description,
          trainingObjectives: row.majors_en.trainingObjectives,
          learningOutcomes: row.majors_en.learningOutcomes,
          careerOpportunities: row.majors_en.careerOpportunities,
          graduationRequirements: row.majors_en.graduationRequirements,
          createdAt: row.majors_en.createdAt,
          updatedAt: row.majors_en.updatedAt,
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
      .from(majors)
      .leftJoin(majorsVi, eq(majors.id, majorsVi.majorId))
      .leftJoin(majorsEn, eq(majors.id, majorsEn.majorId))
      .where(eq(majors.id, id));

    if (!result) {
      throw new NotFoundException('Major not found');
    }

    return {
      id: result.majors.id,
      educationLevelId: result.majors.educationLevelId,
      code: result.majors.code,
      degreeType: result.majors.degreeType,
      status: result.majors.status,
      order: result.majors.order,
      createdAt: result.majors.createdAt,
      updatedAt: result.majors.updatedAt,
      vietnamese: result.majors_vi ? {
        id: result.majors_vi.id,
        majorId: result.majors_vi.majorId,
        name: result.majors_vi.name,
        slug: result.majors_vi.slug,
        description: result.majors_vi.description,
        trainingObjectives: result.majors_vi.trainingObjectives,
        learningOutcomes: result.majors_vi.learningOutcomes,
        careerOpportunities: result.majors_vi.careerOpportunities,
        graduationRequirements: result.majors_vi.graduationRequirements,
        createdAt: result.majors_vi.createdAt,
        updatedAt: result.majors_vi.updatedAt,
      } : null,
      english: result.majors_en ? {
        id: result.majors_en.id,
        majorId: result.majors_en.majorId,
        name: result.majors_en.name,
        slug: result.majors_en.slug,
        description: result.majors_en.description,
        trainingObjectives: result.majors_en.trainingObjectives,
        learningOutcomes: result.majors_en.learningOutcomes,
        careerOpportunities: result.majors_en.careerOpportunities,
        graduationRequirements: result.majors_en.graduationRequirements,
        createdAt: result.majors_en.createdAt,
        updatedAt: result.majors_en.updatedAt,
      } : null,
    };
  }

  async findBySlugVi(slug: string) {
    const [result] = await this.db
      .select()
      .from(majors)
      .leftJoin(majorsVi, eq(majors.id, majorsVi.majorId))
      .leftJoin(majorsEn, eq(majors.id, majorsEn.majorId))
      .where(eq(majorsVi.slug, slug));

    if (!result) {
      throw new NotFoundException('Major not found');
    }

    return {
      id: result.majors.id,
      educationLevelId: result.majors.educationLevelId,
      code: result.majors.code,
      degreeType: result.majors.degreeType,
      status: result.majors.status,
      order: result.majors.order,
      createdAt: result.majors.createdAt,
      updatedAt: result.majors.updatedAt,
      vietnamese: result.majors_vi ? {
        id: result.majors_vi.id,
        majorId: result.majors_vi.majorId,
        name: result.majors_vi.name,
        slug: result.majors_vi.slug,
        description: result.majors_vi.description,
        trainingObjectives: result.majors_vi.trainingObjectives,
        learningOutcomes: result.majors_vi.learningOutcomes,
        careerOpportunities: result.majors_vi.careerOpportunities,
        graduationRequirements: result.majors_vi.graduationRequirements,
        createdAt: result.majors_vi.createdAt,
        updatedAt: result.majors_vi.updatedAt,
      } : null,
      english: result.majors_en ? {
        id: result.majors_en.id,
        majorId: result.majors_en.majorId,
        name: result.majors_en.name,
        slug: result.majors_en.slug,
        description: result.majors_en.description,
        trainingObjectives: result.majors_en.trainingObjectives,
        learningOutcomes: result.majors_en.learningOutcomes,
        careerOpportunities: result.majors_en.careerOpportunities,
        graduationRequirements: result.majors_en.graduationRequirements,
        createdAt: result.majors_en.createdAt,
        updatedAt: result.majors_en.updatedAt,
      } : null,
    };
  }

  async findBySlugEn(slug: string) {
    const [result] = await this.db
      .select()
      .from(majors)
      .leftJoin(majorsVi, eq(majors.id, majorsVi.majorId))
      .leftJoin(majorsEn, eq(majors.id, majorsEn.majorId))
      .where(eq(majorsEn.slug, slug));

    if (!result) {
      throw new NotFoundException('Major not found');
    }

    return {
      id: result.majors.id,
      educationLevelId: result.majors.educationLevelId,
      code: result.majors.code,
      degreeType: result.majors.degreeType,
      status: result.majors.status,
      order: result.majors.order,
      createdAt: result.majors.createdAt,
      updatedAt: result.majors.updatedAt,
      vietnamese: result.majors_vi ? {
        id: result.majors_vi.id,
        majorId: result.majors_vi.majorId,
        name: result.majors_vi.name,
        slug: result.majors_vi.slug,
        description: result.majors_vi.description,
        trainingObjectives: result.majors_vi.trainingObjectives,
        learningOutcomes: result.majors_vi.learningOutcomes,
        careerOpportunities: result.majors_vi.careerOpportunities,
        graduationRequirements: result.majors_vi.graduationRequirements,
        createdAt: result.majors_vi.createdAt,
        updatedAt: result.majors_vi.updatedAt,
      } : null,
      english: result.majors_en ? {
        id: result.majors_en.id,
        majorId: result.majors_en.majorId,
        name: result.majors_en.name,
        slug: result.majors_en.slug,
        description: result.majors_en.description,
        trainingObjectives: result.majors_en.trainingObjectives,
        learningOutcomes: result.majors_en.learningOutcomes,
        careerOpportunities: result.majors_en.careerOpportunities,
        graduationRequirements: result.majors_en.graduationRequirements,
        createdAt: result.majors_en.createdAt,
        updatedAt: result.majors_en.updatedAt,
      } : null,
    };
  }

  async updateBase(id: number, data: UpdateMajorDto) {
    const [result] = await this.db
      .update(majors)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(majors.id, id))
      .returning();

    if (!result) {
      throw new NotFoundException('Major not found');
    }

    return result;
  }

  async updateVietnamese(majorId: number, data: UpdateMajorViDto) {
    // Handle slug update
    let updateData = { ...data };
    if (data.slug) {
      const existingSlugsVi = await this.getExistingSlugsVi();
      // Remove current major's slug from existing slugs to allow keeping the same slug
      const currentMajor = await this.findOne(majorId);
      const filteredSlugs = existingSlugsVi.filter(slug => slug !== currentMajor.vietnamese?.slug);
      updateData.slug = generateUniqueSlug(data.slug, filteredSlugs);
    }

    const [result] = await this.db
      .update(majorsVi)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(majorsVi.majorId, majorId))
      .returning();

    if (!result) {
      throw new NotFoundException('Vietnamese content not found');
    }

    return result;
  }

  async updateEnglish(majorId: number, data: UpdateMajorEnDto) {
    // Handle slug update
    let updateData = { ...data };
    if (data.slug) {
      const existingSlugsEn = await this.getExistingSlugsEn();
      // Remove current major's slug from existing slugs to allow keeping the same slug
      const currentMajor = await this.findOne(majorId);
      const filteredSlugs = existingSlugsEn.filter(slug => slug !== currentMajor.english?.slug);
      updateData.slug = generateUniqueSlug(data.slug, filteredSlugs);
    }

    const [result] = await this.db
      .update(majorsEn)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(majorsEn.majorId, majorId))
      .returning();

    if (!result) {
      throw new NotFoundException('English content not found');
    }

    return result;
  }

  async remove(id: number) {
    const [result] = await this.db
      .delete(majors)
      .where(eq(majors.id, id))
      .returning();

    if (!result) {
      throw new NotFoundException('Major not found');
    }

    return result;
  }
}
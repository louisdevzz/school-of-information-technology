import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { programs, programsVi, programsEn } from '../../../db/schema';
import {
  CreateProgramDto,
  UpdateProgramDto,
  UpdateProgramViDto,
  UpdateProgramEnDto,
} from './dto/program.dto';
import { PaginationDto } from '../../common/dto/base.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class ProgramsService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private translationService: TranslationService,
  ) {}

  async create(data: CreateProgramDto) {
    try {
      // 1. Create base program
      const [baseResult] = await this.db
        .insert(programs)
        .values({
          majorId: data.majorId,
          code: data.code,
          version: data.version,
          language: data.language,
          duration: data.duration,
          semesters: data.semesters,
          totalCredits: data.totalCredits,
          trainingType: data.trainingType,
          status: data.status,
          year: data.year,
          minGpa: data.minGpa,
          englishRequirement: data.englishRequirement,
        })
        .returning();

      // 2. Create Vietnamese content
      const [viResult] = await this.db
        .insert(programsVi)
        .values({
          programId: baseResult.id,
          programName: data.programNameVi,
          degree: data.degreeVi,
          description: data.descriptionVi,
          mission: data.missionVi,
          vision: data.visionVi,
          coreValues: data.coreValuesVi,
          philosophy: data.philosophyVi,
          objectives: data.objectivesVi,
          learningOutcomes: data.learningOutcomesVi,
          graduationRequirements: data.graduationRequirementsVi,
          admissionInfo: data.admissionInfoVi,
          careerOpportunities: data.careerOpportunitiesVi,
          furtherStudy: data.furtherStudyVi,
        })
        .returning();

      // 3. Auto-translate to English (async)
      this.translateAndCreateEnglish(baseResult.id, data);

      return {
        base: baseResult,
        vietnamese: viResult,
      };
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('Program with this code already exists');
      }
      throw error;
    }
  }

  private async translateAndCreateEnglish(programId: number, data: CreateProgramDto) {
    try {
      // Translate all Vietnamese fields
      const translations = await Promise.all([
        this.translationService.translateText(data.programNameVi, 'vi', 'en', 'Program name'),
        this.translationService.translateText(data.degreeVi, 'vi', 'en', 'Degree name'),
        data.descriptionVi ? this.translationService.translateText(data.descriptionVi, 'vi', 'en', 'Program description') : Promise.resolve(undefined),
        data.missionVi ? this.translationService.translateText(data.missionVi, 'vi', 'en', 'Program mission') : Promise.resolve(undefined),
        data.visionVi ? this.translationService.translateText(data.visionVi, 'vi', 'en', 'Program vision') : Promise.resolve(undefined),
        data.coreValuesVi ? this.translationService.translateText(data.coreValuesVi, 'vi', 'en', 'Core values') : Promise.resolve(undefined),
        data.philosophyVi ? this.translationService.translateText(data.philosophyVi, 'vi', 'en', 'Educational philosophy') : Promise.resolve(undefined),
        data.objectivesVi ? this.translationService.translateText(data.objectivesVi, 'vi', 'en', 'Program objectives') : Promise.resolve(undefined),
        data.graduationRequirementsVi ? this.translationService.translateText(data.graduationRequirementsVi, 'vi', 'en', 'Graduation requirements') : Promise.resolve(undefined),
        data.admissionInfoVi ? this.translationService.translateText(data.admissionInfoVi, 'vi', 'en', 'Admission information') : Promise.resolve(undefined),
        data.careerOpportunitiesVi ? this.translationService.translateText(data.careerOpportunitiesVi, 'vi', 'en', 'Career opportunities') : Promise.resolve(undefined),
        data.furtherStudyVi ? this.translationService.translateText(data.furtherStudyVi, 'vi', 'en', 'Further study opportunities') : Promise.resolve(undefined),
      ]);

      const [
        programNameEn,
        degreeEn,
        descriptionEn,
        missionEn,
        visionEn,
        coreValuesEn,
        philosophyEn,
        objectivesEn,
        graduationRequirementsEn,
        admissionInfoEn,
        careerOpportunitiesEn,
        furtherStudyEn,
      ] = translations;

      // Create English content
      await this.db
        .insert(programsEn)
        .values({
          programId,
          programName: programNameEn,
          degree: degreeEn,
          description: descriptionEn,
          mission: missionEn,
          vision: visionEn,
          coreValues: coreValuesEn,
          philosophy: philosophyEn,
          objectives: objectivesEn,
          learningOutcomes: data.learningOutcomesVi, // Keep as is for now
          graduationRequirements: graduationRequirementsEn,
          admissionInfo: admissionInfoEn,
          careerOpportunities: careerOpportunitiesEn,
          furtherStudy: furtherStudyEn,
        })
        .returning();
    } catch (error) {
      console.error('Failed to translate program:', error);
      // Don't throw error to avoid breaking the main create flow
    }
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const results = await this.db
      .select()
      .from(programs)
      .leftJoin(programsVi, eq(programs.id, programsVi.programId))
      .leftJoin(programsEn, eq(programs.id, programsEn.programId))
      .orderBy(programs.year, programs.id)
      .limit(limit)
      .offset(offset);

    const total = await this.db
      .select({ count: programs.id })
      .from(programs);

    return {
      data: results.map(row => ({
        id: row.programs.id,
        majorId: row.programs.majorId,
        code: row.programs.code,
        version: row.programs.version,
        language: row.programs.language,
        duration: row.programs.duration,
        semesters: row.programs.semesters,
        totalCredits: row.programs.totalCredits,
        trainingType: row.programs.trainingType,
        status: row.programs.status,
        year: row.programs.year,
        minGpa: row.programs.minGpa,
        englishRequirement: row.programs.englishRequirement,
        createdAt: row.programs.createdAt,
        updatedAt: row.programs.updatedAt,
        vietnamese: row.programs_vi ? {
          id: row.programs_vi.id,
          programId: row.programs_vi.programId,
          programName: row.programs_vi.programName,
          degree: row.programs_vi.degree,
          description: row.programs_vi.description,
          mission: row.programs_vi.mission,
          vision: row.programs_vi.vision,
          coreValues: row.programs_vi.coreValues,
          philosophy: row.programs_vi.philosophy,
          objectives: row.programs_vi.objectives,
          learningOutcomes: row.programs_vi.learningOutcomes,
          graduationRequirements: row.programs_vi.graduationRequirements,
          admissionInfo: row.programs_vi.admissionInfo,
          careerOpportunities: row.programs_vi.careerOpportunities,
          furtherStudy: row.programs_vi.furtherStudy,
          createdAt: row.programs_vi.createdAt,
          updatedAt: row.programs_vi.updatedAt,
        } : null,
        english: row.programs_en ? {
          id: row.programs_en.id,
          programId: row.programs_en.programId,
          programName: row.programs_en.programName,
          degree: row.programs_en.degree,
          description: row.programs_en.description,
          mission: row.programs_en.mission,
          vision: row.programs_en.vision,
          coreValues: row.programs_en.coreValues,
          philosophy: row.programs_en.philosophy,
          objectives: row.programs_en.objectives,
          learningOutcomes: row.programs_en.learningOutcomes,
          graduationRequirements: row.programs_en.graduationRequirements,
          admissionInfo: row.programs_en.admissionInfo,
          careerOpportunities: row.programs_en.careerOpportunities,
          furtherStudy: row.programs_en.furtherStudy,
          translationStatus: row.programs_en.translationStatus,
          translatedAt: row.programs_en.translatedAt,
          reviewedAt: row.programs_en.reviewedAt,
          approvedAt: row.programs_en.approvedAt,
          createdAt: row.programs_en.createdAt,
          updatedAt: row.programs_en.updatedAt,
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
      .from(programs)
      .leftJoin(programsVi, eq(programs.id, programsVi.programId))
      .leftJoin(programsEn, eq(programs.id, programsEn.programId))
      .where(eq(programs.id, id));

    if (!result) {
      throw new NotFoundException('Program not found');
    }

    return {
      id: result.programs.id,
      majorId: result.programs.majorId,
      code: result.programs.code,
      version: result.programs.version,
      language: result.programs.language,
      duration: result.programs.duration,
      semesters: result.programs.semesters,
      totalCredits: result.programs.totalCredits,
      trainingType: result.programs.trainingType,
      status: result.programs.status,
      year: result.programs.year,
      minGpa: result.programs.minGpa,
      englishRequirement: result.programs.englishRequirement,
      createdAt: result.programs.createdAt,
      updatedAt: result.programs.updatedAt,
      vietnamese: result.programs_vi ? {
        id: result.programs_vi.id,
        programId: result.programs_vi.programId,
        programName: result.programs_vi.programName,
        degree: result.programs_vi.degree,
        description: result.programs_vi.description,
        mission: result.programs_vi.mission,
        vision: result.programs_vi.vision,
        coreValues: result.programs_vi.coreValues,
        philosophy: result.programs_vi.philosophy,
        objectives: result.programs_vi.objectives,
        learningOutcomes: result.programs_vi.learningOutcomes,
        graduationRequirements: result.programs_vi.graduationRequirements,
        admissionInfo: result.programs_vi.admissionInfo,
        careerOpportunities: result.programs_vi.careerOpportunities,
        furtherStudy: result.programs_vi.furtherStudy,
        createdAt: result.programs_vi.createdAt,
        updatedAt: result.programs_vi.updatedAt,
      } : null,
      english: result.programs_en ? {
        id: result.programs_en.id,
        programId: result.programs_en.programId,
        programName: result.programs_en.programName,
        degree: result.programs_en.degree,
        description: result.programs_en.description,
        mission: result.programs_en.mission,
        vision: result.programs_en.vision,
        coreValues: result.programs_en.coreValues,
        philosophy: result.programs_en.philosophy,
        objectives: result.programs_en.objectives,
        learningOutcomes: result.programs_en.learningOutcomes,
        graduationRequirements: result.programs_en.graduationRequirements,
        admissionInfo: result.programs_en.admissionInfo,
        careerOpportunities: result.programs_en.careerOpportunities,
        furtherStudy: result.programs_en.furtherStudy,
        translationStatus: result.programs_en.translationStatus,
        translatedAt: result.programs_en.translatedAt,
        reviewedAt: result.programs_en.reviewedAt,
        approvedAt: result.programs_en.approvedAt,
        createdAt: result.programs_en.createdAt,
        updatedAt: result.programs_en.updatedAt,
      } : null,
    };
  }

  async updateBase(id: number, data: UpdateProgramDto) {
    const [result] = await this.db
      .update(programs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(programs.id, id))
      .returning();

    if (!result) {
      throw new NotFoundException('Program not found');
    }

    return result;
  }

  async updateVietnamese(programId: number, data: UpdateProgramViDto) {
    const [result] = await this.db
      .update(programsVi)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(programsVi.programId, programId))
      .returning();

    if (!result) {
      throw new NotFoundException('Vietnamese content not found');
    }

    return result;
  }

  async updateEnglish(programId: number, data: UpdateProgramEnDto) {
    const [result] = await this.db
      .update(programsEn)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(programsEn.programId, programId))
      .returning();

    if (!result) {
      throw new NotFoundException('English content not found');
    }

    return result;
  }

  async remove(id: number) {
    const [result] = await this.db
      .delete(programs)
      .where(eq(programs.id, id))
      .returning();

    if (!result) {
      throw new NotFoundException('Program not found');
    }

    return result;
  }

  async findByMajor(majorId: number, pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    const results = await this.db
      .select()
      .from(programs)
      .leftJoin(programsVi, eq(programs.id, programsVi.programId))
      .leftJoin(programsEn, eq(programs.id, programsEn.programId))
      .where(eq(programs.majorId, majorId))
      .orderBy(programs.year, programs.id)
      .limit(limit)
      .offset(offset);

    const total = await this.db
      .select({ count: programs.id })
      .from(programs)
      .where(eq(programs.majorId, majorId));

    return {
      data: results.map(row => ({
        id: row.programs.id,
        majorId: row.programs.majorId,
        code: row.programs.code,
        version: row.programs.version,
        language: row.programs.language,
        duration: row.programs.duration,
        semesters: row.programs.semesters,
        totalCredits: row.programs.totalCredits,
        trainingType: row.programs.trainingType,
        status: row.programs.status,
        year: row.programs.year,
        minGpa: row.programs.minGpa,
        englishRequirement: row.programs.englishRequirement,
        createdAt: row.programs.createdAt,
        updatedAt: row.programs.updatedAt,
        vietnamese: row.programs_vi ? {
          id: row.programs_vi.id,
          programId: row.programs_vi.programId,
          programName: row.programs_vi.programName,
          degree: row.programs_vi.degree,
          description: row.programs_vi.description,
          mission: row.programs_vi.mission,
          vision: row.programs_vi.vision,
          coreValues: row.programs_vi.coreValues,
          philosophy: row.programs_vi.philosophy,
          objectives: row.programs_vi.objectives,
          learningOutcomes: row.programs_vi.learningOutcomes,
          graduationRequirements: row.programs_vi.graduationRequirements,
          admissionInfo: row.programs_vi.admissionInfo,
          careerOpportunities: row.programs_vi.careerOpportunities,
          furtherStudy: row.programs_vi.furtherStudy,
          createdAt: row.programs_vi.createdAt,
          updatedAt: row.programs_vi.updatedAt,
        } : null,
        english: row.programs_en ? {
          id: row.programs_en.id,
          programId: row.programs_en.programId,
          programName: row.programs_en.programName,
          degree: row.programs_en.degree,
          description: row.programs_en.description,
          mission: row.programs_en.mission,
          vision: row.programs_en.vision,
          coreValues: row.programs_en.coreValues,
          philosophy: row.programs_en.philosophy,
          objectives: row.programs_en.objectives,
          learningOutcomes: row.programs_en.learningOutcomes,
          graduationRequirements: row.programs_en.graduationRequirements,
          admissionInfo: row.programs_en.admissionInfo,
          careerOpportunities: row.programs_en.careerOpportunities,
          furtherStudy: row.programs_en.furtherStudy,
          translationStatus: row.programs_en.translationStatus,
          translatedAt: row.programs_en.translatedAt,
          reviewedAt: row.programs_en.reviewedAt,
          approvedAt: row.programs_en.approvedAt,
          createdAt: row.programs_en.createdAt,
          updatedAt: row.programs_en.updatedAt,
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
}

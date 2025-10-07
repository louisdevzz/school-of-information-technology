import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { coursesVi, coursesEn } from '../../../db/schema';
import {
  CreateCourseDto,
  UpdateCourseDto,
  UpdateCourseViDto,
  UpdateCourseEnDto,
} from './dto/course.dto';
import { PaginationDto } from '../../common/dto/base.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private translationService: TranslationService,
  ) {}

  async create(data: CreateCourseDto) {
    try {
      // 1. Create Vietnamese content
      const [viResult] = await this.db
        .insert(coursesVi)
        .values({
          code: data.code,
          name: data.nameVi,
          description: data.descriptionVi,
          credits: data.credits,
          theoryHours: data.theoryHours,
          practiceHours: data.practiceHours,
          selfStudyHours: data.selfStudyHours,
          courseType: data.courseType,
          prerequisites: data.prerequisites,
          learningOutcomes: data.learningOutcomesVi,
        })
        .returning();

      // 2. Auto-translate to English (async)
      this.translateAndCreateEnglish(data);

      return {
        vietnamese: viResult,
      };
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('Course with this code already exists');
      }
      throw error;
    }
  }

  private async translateAndCreateEnglish(data: CreateCourseDto) {
    try {
      // Translate Vietnamese fields
      const translations = await Promise.all([
        this.translationService.translateText(data.nameVi, 'vi', 'en', 'Course name'),
        data.descriptionVi ? this.translationService.translateText(data.descriptionVi, 'vi', 'en', 'Course description') : Promise.resolve(undefined),
      ]);

      const [nameEn, descriptionEn] = translations;

      // Create English content
      await this.db
        .insert(coursesEn)
        .values({
          code: data.code,
          name: nameEn,
          description: descriptionEn,
          credits: data.credits,
          theoryHours: data.theoryHours,
          practiceHours: data.practiceHours,
          selfStudyHours: data.selfStudyHours,
          courseType: data.courseType,
          prerequisites: data.prerequisites,
          learningOutcomes: data.learningOutcomesVi, // Keep as is for now
        })
        .returning();
    } catch (error) {
      console.error('Failed to translate course:', error);
      // Don't throw error to avoid breaking the main create flow
    }
  }

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    // Get Vietnamese courses
    const vietnameseCourses = await this.db
      .select()
      .from(coursesVi)
      .orderBy(coursesVi.code)
      .limit(limit)
      .offset(offset);

    // Get English courses
    const englishCourses = await this.db
      .select()
      .from(coursesEn)
      .orderBy(coursesEn.code)
      .limit(limit)
      .offset(offset);

    // Combine results by course code
    const courseMap = new Map();
    
    vietnameseCourses.forEach(course => {
      courseMap.set(course.code, {
        vietnamese: {
          id: course.id,
          code: course.code,
          name: course.name,
          description: course.description,
          credits: course.credits,
          theoryHours: course.theoryHours,
          practiceHours: course.practiceHours,
          selfStudyHours: course.selfStudyHours,
          courseType: course.courseType,
          prerequisites: course.prerequisites,
          learningOutcomes: course.learningOutcomes,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
        },
      });
    });

    englishCourses.forEach(course => {
      const existing = courseMap.get(course.code);
      if (existing) {
        existing.english = {
          id: course.id,
          code: course.code,
          name: course.name,
          description: course.description,
          credits: course.credits,
          theoryHours: course.theoryHours,
          practiceHours: course.practiceHours,
          selfStudyHours: course.selfStudyHours,
          courseType: course.courseType,
          prerequisites: course.prerequisites,
          learningOutcomes: course.learningOutcomes,
          translationStatus: course.translationStatus,
          translatedAt: course.translatedAt,
          reviewedAt: course.reviewedAt,
          approvedAt: course.approvedAt,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
        };
      } else {
        courseMap.set(course.code, {
          english: {
            id: course.id,
            code: course.code,
            name: course.name,
            description: course.description,
            credits: course.credits,
            theoryHours: course.theoryHours,
            practiceHours: course.practiceHours,
            selfStudyHours: course.selfStudyHours,
            courseType: course.courseType,
            prerequisites: course.prerequisites,
            learningOutcomes: course.learningOutcomes,
            translationStatus: course.translationStatus,
            translatedAt: course.translatedAt,
            reviewedAt: course.reviewedAt,
            approvedAt: course.approvedAt,
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
          },
        });
      }
    });

    const total = await this.db
      .select({ count: coursesVi.id })
      .from(coursesVi);

    return {
      data: Array.from(courseMap.values()),
      pagination: {
        page,
        limit,
        total: total.length,
        totalPages: Math.ceil(total.length / limit),
      },
    };
  }

  async findByCode(code: string) {
    const vietnameseCourse = await this.db
      .select()
      .from(coursesVi)
      .where(eq(coursesVi.code, code))
      .limit(1);

    const englishCourse = await this.db
      .select()
      .from(coursesEn)
      .where(eq(coursesEn.code, code))
      .limit(1);

    if (!vietnameseCourse.length && !englishCourse.length) {
      throw new NotFoundException('Course not found');
    }

    const result: any = {};

    if (vietnameseCourse.length) {
      result.vietnamese = {
        id: vietnameseCourse[0].id,
        code: vietnameseCourse[0].code,
        name: vietnameseCourse[0].name,
        description: vietnameseCourse[0].description,
        credits: vietnameseCourse[0].credits,
        theoryHours: vietnameseCourse[0].theoryHours,
        practiceHours: vietnameseCourse[0].practiceHours,
        selfStudyHours: vietnameseCourse[0].selfStudyHours,
        courseType: vietnameseCourse[0].courseType,
        prerequisites: vietnameseCourse[0].prerequisites,
        learningOutcomes: vietnameseCourse[0].learningOutcomes,
        createdAt: vietnameseCourse[0].createdAt,
        updatedAt: vietnameseCourse[0].updatedAt,
      };
    }

    if (englishCourse.length) {
      result.english = {
        id: englishCourse[0].id,
        code: englishCourse[0].code,
        name: englishCourse[0].name,
        description: englishCourse[0].description,
        credits: englishCourse[0].credits,
        theoryHours: englishCourse[0].theoryHours,
        practiceHours: englishCourse[0].practiceHours,
        selfStudyHours: englishCourse[0].selfStudyHours,
        courseType: englishCourse[0].courseType,
        prerequisites: englishCourse[0].prerequisites,
        learningOutcomes: englishCourse[0].learningOutcomes,
        translationStatus: englishCourse[0].translationStatus,
        translatedAt: englishCourse[0].translatedAt,
        reviewedAt: englishCourse[0].reviewedAt,
        approvedAt: englishCourse[0].approvedAt,
        createdAt: englishCourse[0].createdAt,
        updatedAt: englishCourse[0].updatedAt,
      };
    }

    return result;
  }

  async updateVietnamese(code: string, data: UpdateCourseViDto) {
    const [result] = await this.db
      .update(coursesVi)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(coursesVi.code, code))
      .returning();

    if (!result) {
      throw new NotFoundException('Vietnamese course not found');
    }

    return result;
  }

  async updateEnglish(code: string, data: UpdateCourseEnDto) {
    const [result] = await this.db
      .update(coursesEn)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(coursesEn.code, code))
      .returning();

    if (!result) {
      throw new NotFoundException('English course not found');
    }

    return result;
  }

  async removeVietnamese(code: string) {
    const [result] = await this.db
      .delete(coursesVi)
      .where(eq(coursesVi.code, code))
      .returning();

    if (!result) {
      throw new NotFoundException('Vietnamese course not found');
    }

    return result;
  }

  async removeEnglish(code: string) {
    const [result] = await this.db
      .delete(coursesEn)
      .where(eq(coursesEn.code, code))
      .returning();

    if (!result) {
      throw new NotFoundException('English course not found');
    }

    return result;
  }

  async remove(code: string) {
    const vietnameseResult = await this.removeVietnamese(code);
    const englishResult = await this.removeEnglish(code);
    
    return {
      vietnamese: vietnameseResult,
      english: englishResult,
    };
  }
}

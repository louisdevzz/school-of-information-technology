import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { programStructuresVi, programStructuresEn } from '../../../db/schema';
import {
  CreateProgramStructureDto,
  UpdateProgramStructureDto,
  UpdateProgramStructureViDto,
  UpdateProgramStructureEnDto,
} from './dto/program-structure.dto';
import { PaginationDto } from '../../common/dto/base.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class ProgramStructuresService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private translationService: TranslationService,
  ) {}

  async create(data: CreateProgramStructureDto) {
    // 1. Create Vietnamese content
    const [viResult] = await this.db
      .insert(programStructuresVi)
      .values({
        programId: data.programId,
        name: data.nameVi,
        description: data.descriptionVi,
        credits: data.credits,
        order: data.order,
      })
      .returning();

    // 2. Auto-translate to English (async)
    this.translateAndCreateEnglish(data);

    return {
      vietnamese: viResult,
    };
  }

  private async translateAndCreateEnglish(data: CreateProgramStructureDto) {
    try {
      // Translate Vietnamese fields
      const translations = await Promise.all([
        this.translationService.translateText(data.nameVi, 'vi', 'en', 'Program structure name'),
        data.descriptionVi ? this.translationService.translateText(data.descriptionVi, 'vi', 'en', 'Program structure description') : Promise.resolve(undefined),
      ]);

      const [nameEn, descriptionEn] = translations;

      // Create English content
      await this.db
        .insert(programStructuresEn)
        .values({
          programId: data.programId,
          name: nameEn,
          description: descriptionEn,
          credits: data.credits,
          order: data.order,
        })
        .returning();
    } catch (error) {
      console.error('Failed to translate program structure:', error);
      // Don't throw error to avoid breaking the main create flow
    }
  }

  async findByProgram(programId: number, pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    const offset = (page - 1) * limit;

    // Get Vietnamese structures
    const vietnameseStructures = await this.db
      .select()
      .from(programStructuresVi)
      .where(eq(programStructuresVi.programId, programId))
      .orderBy(programStructuresVi.order, programStructuresVi.id)
      .limit(limit)
      .offset(offset);

    // Get English structures
    const englishStructures = await this.db
      .select()
      .from(programStructuresEn)
      .where(eq(programStructuresEn.programId, programId))
      .orderBy(programStructuresEn.order, programStructuresEn.id)
      .limit(limit)
      .offset(offset);

    // Combine results by structure name/order
    const structureMap = new Map();
    
    vietnameseStructures.forEach(structure => {
      const key = `${structure.programId}-${structure.order}`;
      structureMap.set(key, {
        vietnamese: {
          id: structure.id,
          programId: structure.programId,
          name: structure.name,
          description: structure.description,
          credits: structure.credits,
          order: structure.order,
          createdAt: structure.createdAt,
          updatedAt: structure.updatedAt,
        },
      });
    });

    englishStructures.forEach(structure => {
      const key = `${structure.programId}-${structure.order}`;
      const existing = structureMap.get(key);
      if (existing) {
        existing.english = {
          id: structure.id,
          programId: structure.programId,
          name: structure.name,
          description: structure.description,
          credits: structure.credits,
          order: structure.order,
          translationStatus: structure.translationStatus,
          translatedAt: structure.translatedAt,
          reviewedAt: structure.reviewedAt,
          approvedAt: structure.approvedAt,
          createdAt: structure.createdAt,
          updatedAt: structure.updatedAt,
        };
      } else {
        structureMap.set(key, {
          english: {
            id: structure.id,
            programId: structure.programId,
            name: structure.name,
            description: structure.description,
            credits: structure.credits,
            order: structure.order,
            translationStatus: structure.translationStatus,
            translatedAt: structure.translatedAt,
            reviewedAt: structure.reviewedAt,
            approvedAt: structure.approvedAt,
            createdAt: structure.createdAt,
            updatedAt: structure.updatedAt,
          },
        });
      }
    });

    const total = await this.db
      .select({ count: programStructuresVi.id })
      .from(programStructuresVi)
      .where(eq(programStructuresVi.programId, programId));

    return {
      data: Array.from(structureMap.values()),
      pagination: {
        page,
        limit,
        total: total.length,
        totalPages: Math.ceil(total.length / limit),
      },
    };
  }

  async findOne(programId: number, order: number) {
    const vietnameseStructure = await this.db
      .select()
      .from(programStructuresVi)
      .where(and(
        eq(programStructuresVi.programId, programId),
        eq(programStructuresVi.order, order)
      ))
      .limit(1);

    const englishStructure = await this.db
      .select()
      .from(programStructuresEn)
      .where(and(
        eq(programStructuresEn.programId, programId),
        eq(programStructuresEn.order, order)
      ))
      .limit(1);

    if (!vietnameseStructure.length && !englishStructure.length) {
      throw new NotFoundException('Program structure not found');
    }

    const result: any = {};

    if (vietnameseStructure.length) {
      result.vietnamese = {
        id: vietnameseStructure[0].id,
        programId: vietnameseStructure[0].programId,
        name: vietnameseStructure[0].name,
        description: vietnameseStructure[0].description,
        credits: vietnameseStructure[0].credits,
        order: vietnameseStructure[0].order,
        createdAt: vietnameseStructure[0].createdAt,
        updatedAt: vietnameseStructure[0].updatedAt,
      };
    }

    if (englishStructure.length) {
      result.english = {
        id: englishStructure[0].id,
        programId: englishStructure[0].programId,
        name: englishStructure[0].name,
        description: englishStructure[0].description,
        credits: englishStructure[0].credits,
        order: englishStructure[0].order,
        translationStatus: englishStructure[0].translationStatus,
        translatedAt: englishStructure[0].translatedAt,
        reviewedAt: englishStructure[0].reviewedAt,
        approvedAt: englishStructure[0].approvedAt,
        createdAt: englishStructure[0].createdAt,
        updatedAt: englishStructure[0].updatedAt,
      };
    }

    return result;
  }

  async updateVietnamese(programId: number, order: number, data: UpdateProgramStructureViDto) {
    const [result] = await this.db
      .update(programStructuresVi)
      .set({ ...data, updatedAt: new Date() })
      .where(and(
        eq(programStructuresVi.programId, programId),
        eq(programStructuresVi.order, order)
      ))
      .returning();

    if (!result) {
      throw new NotFoundException('Vietnamese program structure not found');
    }

    return result;
  }

  async updateEnglish(programId: number, order: number, data: UpdateProgramStructureEnDto) {
    const [result] = await this.db
      .update(programStructuresEn)
      .set({ ...data, updatedAt: new Date() })
      .where(and(
        eq(programStructuresEn.programId, programId),
        eq(programStructuresEn.order, order)
      ))
      .returning();

    if (!result) {
      throw new NotFoundException('English program structure not found');
    }

    return result;
  }

  async removeVietnamese(programId: number, order: number) {
    const [result] = await this.db
      .delete(programStructuresVi)
      .where(and(
        eq(programStructuresVi.programId, programId),
        eq(programStructuresVi.order, order)
      ))
      .returning();

    if (!result) {
      throw new NotFoundException('Vietnamese program structure not found');
    }

    return result;
  }

  async removeEnglish(programId: number, order: number) {
    const [result] = await this.db
      .delete(programStructuresEn)
      .where(and(
        eq(programStructuresEn.programId, programId),
        eq(programStructuresEn.order, order)
      ))
      .returning();

    if (!result) {
      throw new NotFoundException('English program structure not found');
    }

    return result;
  }

  async remove(programId: number, order: number) {
    const vietnameseResult = await this.removeVietnamese(programId, order);
    const englishResult = await this.removeEnglish(programId, order);
    
    return {
      vietnamese: vietnameseResult,
      english: englishResult,
    };
  }
}

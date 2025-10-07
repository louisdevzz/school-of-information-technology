import { Module } from '@nestjs/common';
import { EducationLevelsController } from './education-levels.controller';
import { EducationLevelsService } from './education-levels.service';
import { DatabaseModule } from '../../database/database.module';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [DatabaseModule, TranslationModule],
  controllers: [EducationLevelsController],
  providers: [EducationLevelsService],
  exports: [EducationLevelsService],
})
export class EducationLevelsModule {}

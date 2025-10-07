import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { DatabaseModule } from '../../database/database.module';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [DatabaseModule, TranslationModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

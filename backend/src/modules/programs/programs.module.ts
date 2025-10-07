import { Module } from '@nestjs/common';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { DatabaseModule } from '../../database/database.module';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [DatabaseModule, TranslationModule],
  controllers: [ProgramsController],
  providers: [ProgramsService],
  exports: [ProgramsService],
})
export class ProgramsModule {}

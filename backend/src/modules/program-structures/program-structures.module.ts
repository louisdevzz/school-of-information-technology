import { Module } from '@nestjs/common';
import { ProgramStructuresController } from './program-structures.controller';
import { ProgramStructuresService } from './program-structures.service';
import { DatabaseModule } from '../../database/database.module';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [DatabaseModule, TranslationModule],
  controllers: [ProgramStructuresController],
  providers: [ProgramStructuresService],
  exports: [ProgramStructuresService],
})
export class ProgramStructuresModule {}

import { Module } from '@nestjs/common';
import { MajorsController } from './majors.controller';
import { MajorsService } from './majors.service';
import { DatabaseModule } from '../../database/database.module';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [DatabaseModule, TranslationModule],
  controllers: [MajorsController],
  providers: [MajorsService],
  exports: [MajorsService],
})
export class MajorsModule {}

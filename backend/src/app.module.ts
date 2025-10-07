import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EducationLevelsModule } from './modules/education-levels/education-levels.module';
import { MajorsModule } from './modules/majors/majors.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ProgramStructuresModule } from './modules/program-structures/program-structures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    EducationLevelsModule,
    MajorsModule,
    ProgramsModule,
    CoursesModule,
    ProgramStructuresModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

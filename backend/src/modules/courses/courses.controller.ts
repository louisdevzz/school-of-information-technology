import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import {
  CreateCourseDto,
  UpdateCourseDto,
  UpdateCourseViDto,
  UpdateCourseEnDto,
} from './dto/course.dto';
import { PaginationDto } from '../../common/dto/base.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCourseDto: CreateCourseDto) {
    const result = await this.coursesService.create(createCourseDto);
    return {
      success: true,
      data: result,
      message: 'Course created successfully with auto-translation',
    };
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.coursesService.findAll(pagination);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':code')
  async findByCode(@Param('code') code: string) {
    const result = await this.coursesService.findByCode(code);
    return {
      success: true,
      data: result,
    };
  }

  @Put(':code/vietnamese')
  async updateVietnamese(
    @Param('code') code: string,
    @Body() updateVietnameseDto: UpdateCourseViDto,
  ) {
    const result = await this.coursesService.updateVietnamese(code, updateVietnameseDto);
    return {
      success: true,
      data: result,
      message: 'Vietnamese course updated successfully',
    };
  }

  @Put(':code/english')
  async updateEnglish(
    @Param('code') code: string,
    @Body() updateEnglishDto: UpdateCourseEnDto,
  ) {
    const result = await this.coursesService.updateEnglish(code, updateEnglishDto);
    return {
      success: true,
      data: result,
      message: 'English course updated successfully',
    };
  }

  @Delete(':code')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('code') code: string) {
    await this.coursesService.remove(code);
    return {
      success: true,
      message: 'Course deleted successfully',
    };
  }

  @Delete(':code/vietnamese')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeVietnamese(@Param('code') code: string) {
    await this.coursesService.removeVietnamese(code);
    return {
      success: true,
      message: 'Vietnamese course deleted successfully',
    };
  }

  @Delete(':code/english')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeEnglish(@Param('code') code: string) {
    await this.coursesService.removeEnglish(code);
    return {
      success: true,
      message: 'English course deleted successfully',
    };
  }
}

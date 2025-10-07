import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  ParseIntPipe,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { EducationLevelsService } from './education-levels.service';
import {
  CreateEducationLevelDto,
  UpdateEducationLevelDto,
  UpdateEducationLevelViDto,
  UpdateEducationLevelEnDto,
} from './dto/education-level.dto';
import { PaginationDto } from '../../common/dto/base.dto';

@Controller('education-levels')
export class EducationLevelsController {
  constructor(private readonly educationLevelsService: EducationLevelsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEducationLevelDto: CreateEducationLevelDto) {
    const result = await this.educationLevelsService.create(createEducationLevelDto);
    return {
      success: true,
      data: result,
      message: 'Education level created successfully with auto-translation',
    };
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.educationLevelsService.findAll(pagination);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.educationLevelsService.findOne(id);
    return {
      success: true,
      data: result,
    };
  }

  @Put(':id')
  async updateBase(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEducationLevelDto: UpdateEducationLevelDto,
  ) {
    const result = await this.educationLevelsService.updateBase(id, updateEducationLevelDto);
    return {
      success: true,
      data: result,
      message: 'Education level updated successfully',
    };
  }

  @Put(':id/vietnamese')
  async updateVietnamese(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVietnameseDto: UpdateEducationLevelViDto,
  ) {
    const result = await this.educationLevelsService.updateVietnamese(id, updateVietnameseDto);
    return {
      success: true,
      data: result,
      message: 'Vietnamese content updated successfully',
    };
  }

  @Put(':id/english')
  async updateEnglish(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnglishDto: UpdateEducationLevelEnDto,
  ) {
    const result = await this.educationLevelsService.updateEnglish(id, updateEnglishDto);
    return {
      success: true,
      data: result,
      message: 'English content updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.educationLevelsService.remove(id);
    return {
      success: true,
      message: 'Education level deleted successfully',
    };
  }
}

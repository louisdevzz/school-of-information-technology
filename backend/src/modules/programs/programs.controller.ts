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
import { ProgramsService } from './programs.service';
import {
  CreateProgramDto,
  UpdateProgramDto,
  UpdateProgramViDto,
  UpdateProgramEnDto,
} from './dto/program.dto';
import { PaginationDto } from '../../common/dto/base.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProgramDto: CreateProgramDto) {
    const result = await this.programsService.create(createProgramDto);
    return {
      success: true,
      data: result,
      message: 'Program created successfully with auto-translation',
    };
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.programsService.findAll(pagination);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get('major/:majorId')
  async findByMajor(
    @Param('majorId', ParseIntPipe) majorId: number,
    @Query() pagination: PaginationDto,
  ) {
    const result = await this.programsService.findByMajor(majorId, pagination);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.programsService.findOne(id);
    return {
      success: true,
      data: result,
    };
  }

  @Put(':id')
  async updateBase(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramDto: UpdateProgramDto,
  ) {
    const result = await this.programsService.updateBase(id, updateProgramDto);
    return {
      success: true,
      data: result,
      message: 'Program updated successfully',
    };
  }

  @Put(':id/vietnamese')
  async updateVietnamese(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVietnameseDto: UpdateProgramViDto,
  ) {
    const result = await this.programsService.updateVietnamese(id, updateVietnameseDto);
    return {
      success: true,
      data: result,
      message: 'Vietnamese content updated successfully',
    };
  }

  @Put(':id/english')
  async updateEnglish(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnglishDto: UpdateProgramEnDto,
  ) {
    const result = await this.programsService.updateEnglish(id, updateEnglishDto);
    return {
      success: true,
      data: result,
      message: 'English content updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.programsService.remove(id);
    return {
      success: true,
      message: 'Program deleted successfully',
    };
  }
}

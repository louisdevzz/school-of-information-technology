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
import { MajorsService } from './majors.service';
import {
  CreateMajorDto,
  UpdateMajorDto,
  UpdateMajorViDto,
  UpdateMajorEnDto,
} from './dto/major.dto';
import { PaginationDto } from '../../common/dto/base.dto';

@Controller('majors')
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMajorDto: CreateMajorDto) {
    const result = await this.majorsService.create(createMajorDto);
    return {
      success: true,
      data: result,
      message: 'Major created successfully with auto-translation',
    };
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    const result = await this.majorsService.findAll(pagination);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.majorsService.findOne(id);
    return {
      success: true,
      data: result,
    };
  }

  @Get('slug/vi/:slug')
  async findBySlugVi(@Param('slug') slug: string) {
    const result = await this.majorsService.findBySlugVi(slug);
    return {
      success: true,
      data: result,
    };
  }

  @Get('slug/en/:slug')
  async findBySlugEn(@Param('slug') slug: string) {
    const result = await this.majorsService.findBySlugEn(slug);
    return {
      success: true,
      data: result,
    };
  }

  @Put(':id')
  async updateBase(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMajorDto: UpdateMajorDto,
  ) {
    const result = await this.majorsService.updateBase(id, updateMajorDto);
    return {
      success: true,
      data: result,
      message: 'Major updated successfully',
    };
  }

  @Put(':id/vietnamese')
  async updateVietnamese(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVietnameseDto: UpdateMajorViDto,
  ) {
    const result = await this.majorsService.updateVietnamese(id, updateVietnameseDto);
    return {
      success: true,
      data: result,
      message: 'Vietnamese content updated successfully',
    };
  }

  @Put(':id/english')
  async updateEnglish(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnglishDto: UpdateMajorEnDto,
  ) {
    const result = await this.majorsService.updateEnglish(id, updateEnglishDto);
    return {
      success: true,
      data: result,
      message: 'English content updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.majorsService.remove(id);
    return {
      success: true,
      message: 'Major deleted successfully',
    };
  }
}

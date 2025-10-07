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
import { ProgramStructuresService } from './program-structures.service';
import {
  CreateProgramStructureDto,
  UpdateProgramStructureDto,
  UpdateProgramStructureViDto,
  UpdateProgramStructureEnDto,
} from './dto/program-structure.dto';
import { PaginationDto } from '../../common/dto/base.dto';

@Controller('program-structures')
export class ProgramStructuresController {
  constructor(private readonly programStructuresService: ProgramStructuresService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProgramStructureDto: CreateProgramStructureDto) {
    const result = await this.programStructuresService.create(createProgramStructureDto);
    return {
      success: true,
      data: result,
      message: 'Program structure created successfully with auto-translation',
    };
  }

  @Get('program/:programId')
  async findByProgram(
    @Param('programId', ParseIntPipe) programId: number,
    @Query() pagination: PaginationDto,
  ) {
    const result = await this.programStructuresService.findByProgram(programId, pagination);
    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }

  @Get('program/:programId/order/:order')
  async findOne(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('order', ParseIntPipe) order: number,
  ) {
    const result = await this.programStructuresService.findOne(programId, order);
    return {
      success: true,
      data: result,
    };
  }

  @Put('program/:programId/order/:order/vietnamese')
  async updateVietnamese(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('order', ParseIntPipe) order: number,
    @Body() updateVietnameseDto: UpdateProgramStructureViDto,
  ) {
    const result = await this.programStructuresService.updateVietnamese(
      programId, 
      order, 
      updateVietnameseDto
    );
    return {
      success: true,
      data: result,
      message: 'Vietnamese program structure updated successfully',
    };
  }

  @Put('program/:programId/order/:order/english')
  async updateEnglish(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('order', ParseIntPipe) order: number,
    @Body() updateEnglishDto: UpdateProgramStructureEnDto,
  ) {
    const result = await this.programStructuresService.updateEnglish(
      programId, 
      order, 
      updateEnglishDto
    );
    return {
      success: true,
      data: result,
      message: 'English program structure updated successfully',
    };
  }

  @Delete('program/:programId/order/:order')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('order', ParseIntPipe) order: number,
  ) {
    await this.programStructuresService.remove(programId, order);
    return {
      success: true,
      message: 'Program structure deleted successfully',
    };
  }

  @Delete('program/:programId/order/:order/vietnamese')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeVietnamese(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('order', ParseIntPipe) order: number,
  ) {
    await this.programStructuresService.removeVietnamese(programId, order);
    return {
      success: true,
      message: 'Vietnamese program structure deleted successfully',
    };
  }

  @Delete('program/:programId/order/:order/english')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeEnglish(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('order', ParseIntPipe) order: number,
  ) {
    await this.programStructuresService.removeEnglish(programId, order);
    return {
      success: true,
      message: 'English program structure deleted successfully',
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { KelasDto } from 'src/dto/kelas.dto';
import { PaginationQueryDto } from 'src/dto/pagination.dto';
import { Kelas } from 'src/entity/kelas.entity';
import { KelasService } from 'src/services/kelas.service';
import { Public } from 'src/utility/public.decorator';

@Controller('api/kelas')
@ApiTags('Kelas')
export class KelasController {
  constructor(private readonly mKelasService: KelasService) {}

  @Get()
  @Public()
  @ApiResponse({ status: 200, description: 'List of kelas', type: [Kelas] })
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Kelas[]> {
    return this.mKelasService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The kelas', type: Kelas })
  async findById(@Param('id') id: number): Promise<Kelas> {
    return this.mKelasService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'The created kelas id' })
  async create(@Body() createMKelasDto: KelasDto): Promise<number> {
    return this.mKelasService.create(createMKelasDto);
  }

  @Put(':id')
  @ApiResponse({ status: 202, description: 'The updated kelas id' })
  async update(
    @Param('id') id: number,
    @Body() createMKelasDto: KelasDto,
  ): Promise<number> {
    return this.mKelasService.update(id, createMKelasDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The deleted kelas id' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.mKelasService.delete(id);
  }
}

import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ type: Number, description: 'Page index (optional)' })
  pageIndex?: number;

  @ApiPropertyOptional({ type: Number, description: 'Page size (optional)' })
  pageSize?: number;

  @ApiPropertyOptional({ type: String, description: 'Filter (optional)' })
  filter?: string;
}

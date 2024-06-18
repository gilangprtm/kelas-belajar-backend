import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ type: Number, description: 'Page index (optional)' })
  pageIndex?: number;

  @ApiPropertyOptional({ type: Number, description: 'Page size (optional)' })
  pageSize?: number;

  @ApiPropertyOptional({ type: String, description: 'Filter (optional)' })
  filter?: string;
}

export class KelasPaginationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by specific guru (optional)',
    type: Boolean,
  })
  spesifik?: boolean;
}

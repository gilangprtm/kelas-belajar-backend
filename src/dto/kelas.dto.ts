import { ApiProperty } from '@nestjs/swagger';

export class KelasDto {
  @ApiProperty()
  readonly nama: string;

  @ApiProperty()
  readonly tahun: number;

  @ApiProperty()
  readonly semester?: number;

  @ApiProperty()
  readonly id_guru: number;
}

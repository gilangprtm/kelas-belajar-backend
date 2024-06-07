import { ApiProperty } from '@nestjs/swagger';

export class Kelas {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nama: string;

  @ApiProperty()
  tahun: number;

  @ApiProperty()
  semester: number;

  @ApiProperty()
  id_guru: number;
}

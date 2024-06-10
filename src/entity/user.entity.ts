import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nama: string;

  @ApiProperty()
  foto: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  id_firebase: string;

  @ApiProperty()
  email: string;
}

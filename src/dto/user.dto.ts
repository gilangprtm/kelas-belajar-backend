import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly nama: string;

  @ApiProperty({ required: false })
  readonly foto?: string;

  @ApiProperty()
  readonly role: string;

  @ApiProperty({ required: false })
  readonly id_firebase?: string;

  @ApiProperty({ required: false })
  readonly email?: string;
}

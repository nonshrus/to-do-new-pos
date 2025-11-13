import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    description: 'password (keep it secret)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

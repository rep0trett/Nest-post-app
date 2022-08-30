import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

const min = 5;
const max = 30;

export class UserCreateDTO {
  @ApiProperty({ example: 'alexbrown@gmail.com' })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(min, max, { message: `Min length ${min}. Max length ${max}` })
  @ApiProperty({ example: 'cc723dsfn_934' })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class PostCreateDTO {
  @ApiProperty({ example: 'Some title' })
  title: string;

  @ApiProperty({ example: 'Some content' })
  content: string;
}

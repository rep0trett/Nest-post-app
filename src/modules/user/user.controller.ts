import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from './dto/user.create.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @Post()
  create(@Body() dto: UserCreateDTO) {
    return this.userService.create(dto);
  }
}

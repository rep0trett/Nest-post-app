import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AUTH_HEADER } from '../../constants';
import { UserCreateDTO } from '../user/dto/user.create.dto';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { IJWTData } from './auth.types';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'signin' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: UserCreateDTO, @Res() res: Response) {
    const { token, user } = await this.authService.signin(dto);
    res.cookie(AUTH_HEADER, token, { httpOnly: true });
    res.json(user);
  }

  @ApiOperation({ summary: 'signup' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: UserCreateDTO, @Res() res: Response) {
    const { token, user } = await this.authService.signup(dto);
    res.cookie(AUTH_HEADER, token, { httpOnly: true });
    res.json(user);
  }

  @ApiOperation({ summary: 'get user info' })
  @ApiResponse({ status: HttpStatus.OK, type: UserEntity })
  @UseGuards(AuthGuard)
  @Get('me')
  me(@User() user: IJWTData) {
    const { userId } = user;
    return this.authService.me(userId);
  }
}

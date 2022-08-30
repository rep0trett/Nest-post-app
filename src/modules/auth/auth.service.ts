import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, genSalt, compare } from 'bcryptjs';
import { UserCreateDTO } from '../user/dto/user.create.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(userDTO: UserCreateDTO) {
    const user = await this.validateUser(userDTO);
    const token = await this.genToken(user.id);

    return {
      user,
      token,
    };
  }

  async signup(userDTO: UserCreateDTO) {
    const user = await this.userService.findByEmail(userDTO.email);
    if (user) {
      throw new BadRequestException('User alredy exist');
    }
    const salt = await genSalt(1);
    const hashPassword = await hash(userDTO.password, salt);

    const _user: UserCreateDTO = { ...userDTO, password: hashPassword };
    const createdUser = await this.userService.create(_user);
    delete createdUser.password;
    const token = await this.genToken(createdUser.id);

    return {
      user: createdUser,
      token,
    };
  }

  async me(id: number) {
    const user = await this.userService.findById(id);

    return user;
  }

  private async genToken(userId: number) {
    const token = this.jwtService.sign(
      { userId },
      {
        secret: 'secret',
      },
    );

    return token;
  }

  private async validateUser(userDTO: UserCreateDTO) {
    const user = await this.userService.findByEmail(userDTO.email, true);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const isMatchPass = await compare(userDTO.password, user.password);

    if (!isMatchPass) {
      throw new UnauthorizedException('Unauthorized');
    }
    delete user.password;

    return user;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_HEADER } from '../../constants';
import { IJWTData } from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies[AUTH_HEADER];
    if (!token) return false;

    try {
      const user = await this.jwtService.verifyAsync<IJWTData>(token);

      req.user = user;
      return true;
    } catch (e) {
      return false;
    }
  }
}

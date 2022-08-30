import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IJWTData } from '../auth/auth.types';

export const User = createParamDecorator(
  (data: keyof IJWTData, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request & { user: IJWTData }>();
    if (data) {
      return req.user[data];
    }
    return req.user;
  },
);

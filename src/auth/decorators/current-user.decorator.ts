import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDTO } from 'src/user/user.dto';
import { AuthRequest } from '../auth.interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserDTO => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);

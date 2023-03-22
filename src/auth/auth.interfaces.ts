import { Request } from 'express';
import { UserRequestDTO, UserDTO } from 'src/user/user.dto';

export interface AuthRequest extends Request {
  user: UserDTO;
}

export interface UserPayload {
  sub: number;
  email: string;
  name?: string;
  iat?: number;
  exp?: number;
  isAdmin: boolean;
}

export interface UserToken {
  access_token: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRequestDTO {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  password: string;
}

export class UserDTO {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsString()
  @Exclude()
  password: string;

  @IsInt()
  id: number;

  @IsBoolean()
  isAdmin: boolean;
}

export class UserUpdateDTO extends PartialType(UserRequestDTO) {}

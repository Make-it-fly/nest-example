import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.client';
import { UserRequestDTO, UserDTO, UserUpdateDTO } from './user.dto';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserRequestDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    console.log(userExists);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };
    const createdUser = await this.prisma.user.create({ data: user });

    const { password, ...rest } = createdUser;
    return rest;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        email: true,
        id: true,
        name: true,
        isAdmin: true,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: UserUpdateDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!userExists) {
      throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async delete(id: number) {
    const userExists = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!userExists) {
      throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

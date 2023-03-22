import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.client';
import { CreateTraitDto } from './dto/create-trait.dto';
import { UpdateTraitDto } from './dto/update-trait.dto';

@Injectable()
export class TraitsService {
  constructor(private prisma: PrismaService) {}

  async create(strUserId: string, data: CreateTraitDto) {
    const userId = parseInt(strUserId);
    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const createdTrait = await this.prisma.trait.create({
      data: {
        name: data.name,
        userId: userId,
      },
    });

    return createdTrait;
  }

  async findAll() {
    return await this.prisma.trait.findMany({ include: { user: true } });
  }

  async findOne(id: number) {
    const trait = await this.prisma.trait.findFirst({ where: { id } });
    if (!trait) {
      throw new HttpException('Trait does not exist', HttpStatus.NOT_FOUND);
    }

    return trait;
  }

  async update(id: number, data: UpdateTraitDto) {
    const trait = await this.prisma.trait.findFirst({ where: { id } });
    if (!trait) {
      throw new HttpException('Trait does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.trait.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    const trait = await this.prisma.trait.findFirst({ where: { id } });

    if (!trait) {
      throw new HttpException('Trait does not exist', HttpStatus.NOT_FOUND);
    }

    await this.prisma.trait.delete({
      where: { id },
    });

    return;
  }
}

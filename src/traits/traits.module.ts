import { Module } from '@nestjs/common';
import { TraitsService } from './traits.service';
import { TraitsController } from './traits.controller';
import { PrismaService } from 'src/database/prisma.client';

@Module({
  controllers: [TraitsController],
  providers: [TraitsService, PrismaService],
})
export class TraitsModule {}

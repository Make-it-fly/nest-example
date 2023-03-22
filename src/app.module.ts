import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.client';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TraitsModule } from './traits/traits.module';

@Module({
  imports: [UserModule, AuthModule, TraitsModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from 'application/services/auth/auth.service';

import { UsersModule } from './user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'application/guards/jwt.guard';
import { DatabaseModule } from './database.module';
import { ExternalModule } from './external.module';
import { GrantsGuard } from 'application/guards/permissions.guard';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    ExternalModule,
    CacheModule.register(),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GrantsGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

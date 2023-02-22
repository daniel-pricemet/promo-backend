import { CacheModule, Module } from '@nestjs/common';
import { GetUserService } from 'application/services/users/get-user.service';
import { UserController } from 'presentation/controllers/user.controller';
import { DatabaseModule } from './database.module';
import { ExternalModule } from './external.module';

@Module({
  imports: [
    DatabaseModule,
    ExternalModule,
    CacheModule.register(),
  ],
  providers: [
    GetUserService,
  ],
  controllers: [UserController],
  exports: [GetUserService],
})
export class UsersModule {}

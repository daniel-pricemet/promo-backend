import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from '../controllers/app.controller';
import { AllExceptionsFilter } from '../filters/all-exceptions.filter';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { ExternalModule } from './external.module';
import { UsersModule } from './user.module';

@Module({
  imports: [DatabaseModule, ExternalModule, AuthModule, UsersModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}

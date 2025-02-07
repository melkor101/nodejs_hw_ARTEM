import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { UsersController } from './users.controller';

import { usersProviders } from './users.providers';

import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {
  //
}

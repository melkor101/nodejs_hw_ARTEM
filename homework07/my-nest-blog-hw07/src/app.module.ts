import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comments/comments.module';
import { JwtModule } from '@nestjs/jwt';

console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    UsersModule,
    PostsModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //
}

import { Controller, Get, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    //
  }

  @Get()
  @Render('index')
  getHello() {
    return;
  }

  @Get('/login')
  @Render('login')
  getLogin() {
    return;
  }

  @Get('/sign-up')
  @Render('sign-up')
  signUpUser() {
    return;
  }

  @Get('/create-post')
  @Render('create-post')
  createPost() {
    return {};
  }

  @Get('/posts')
  @Render('posts')
  posts() {
    return this.appService.getPosts();
  }

  @Get('/posts/:id')
  @Render('post')
  async postById(@Param('id') id: number) {
    const post = await this.appService.getPostById(id);

    return { post };
  }

  @Get('/posts/update-post/:id')
  @Render('update-post')
  async updatePost(@Param('id') id: number) {
    const post = await this.appService.getPostById(id);

    return { post };
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Post } from './posts/entities/post.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService<{ BASE_URL: string }, true>,
  ) {
    //
  }

  async getPosts() {
    try {
      const response = await axios.get<{ data: Post[] }>(
        `${this.configService.get('BASE_URL')}api/v1/posts`,
      );

      return { posts: response.data };
    } catch {
      return { posts: [] };
    }
  }

  async getPostById(postId: number) {
    try {
      const response = await axios.get<{ data: Post[] }>(
        `${this.configService.get('BASE_URL')}api/v1/posts/${postId}`,
      );

      return response.data;
    } catch {
      return {};
    }
  }
}

import { Inject, Injectable } from '@nestjs/common';

import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POSTS_REPOSITORY')
    private postsRepository: Repository<Post>,
  ) {
    //
  }

  async create(createPostDto: CreatePostDto) {
    const Post = this.postsRepository.create(createPostDto);
    const created = new Date().toLocaleDateString();

    return await this.postsRepository.save({
      ...Post,
      authorId: 1,
      created,
    });
  }

  async findAll() {
    return await this.postsRepository.find({
      relations: ['author', 'comments'],
    });
  }

  async findAllByUser(userId: number) {
    return await this.postsRepository.findBy({
      authorId: userId,
    });
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postsRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postsRepository.delete(id);
  }
}

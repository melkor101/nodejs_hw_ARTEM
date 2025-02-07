import { Inject, Injectable } from '@nestjs/common';

import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: Repository<Comment>,
  ) {
    //
  }

  async create(createCommentDto: CreateCommentDto) {
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      postId: createCommentDto.postId,
    });

    return await this.commentsRepository.save({
      ...comment,
      postId: createCommentDto.postId,
    });
  }

  async findAll() {
    return await this.commentsRepository.find({
      relations: ['author', 'comments'],
    });
  }

  async findAllByUser(postId: number) {
    return await this.commentsRepository.find({
      where: { postId },
      relations: ['comments', 'author'],
    });
  }

  async findById(id: number) {
    return await this.commentsRepository.findOne({
      where: { id },
      relations: ['comments', 'author'],
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentsRepository.delete(id);
  }
}

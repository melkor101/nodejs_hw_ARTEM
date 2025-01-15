import { Repository } from "typeorm";
import { Post } from "../models/Post";
import { appDataSource } from "./appDataSource";

import { StatusEnum } from '../types/enums';

export class PostService {

  private repository: Repository<Post>;

  constructor() {
    this.repository = appDataSource.getRepository(Post);
  }

  // Method to get all posts
  async getAllPosts(filters: Record<string, any> = {}) {
    return this.repository.find(filters);
  }


  // Method to get a post by ID
  async getPostById(id: string) {
    return this.repository.find({});
  }

  // Method to create a new post
  async createPost(data: {
    authorId: number,
    title: string,
    content: string,
    status: StatusEnum,
  }) {
    const post = new Post();
    post.authorId = data.authorId;
    post.title = data.title;
    post.content = data.content;
    post.status = data.status;

    return this.repository.save(post);
  }

  // Method to update a post
  async updatePostById(id: string, data: {
    authorId?: number,
    title?: string,
    content?: string,
    status?: StatusEnum,
  }) {
    const post = await this.repository.findOneById(id);
    if (!post) {
      throw new Error(`Post with id ${id} not found!`)
    }
    post.authorId = data.authorId || 0;
    post.title = data.title || '';
    post.content = data.content || '';
    post.status = data.status;

    await this.repository.save(post);
  }

  // Method to delete a post
  async deletePost(id: string) {
    return this.repository.delete(id);
  }


  // Method to get a posts byy user id
  async getPostsByUserId(id: string) {
    if (!id) {
      throw new Error(`id required`)
    }

    const posts = await this.repository.find({
      where: {
        authorId: Number(id),
      },
    });

    return posts || []
  }
}


export const postService = new PostService();
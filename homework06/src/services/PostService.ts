import { Repository } from "typeorm";
import { Post } from "../models/Post";
import { appDataSource } from "./appDataSource";


export enum StatusEnum {
  draft = "draft",
  published = "published",
  archived = "archived"
}

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
    return this.repository.findOneById(id);
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
    post.status = data.status || '';

    await this.repository.save(post);
  }

  // Method to delete a post
  async deletePost(id: string) {
    return this.repository.delete(id);
  }
}

export const postService = new PostService();
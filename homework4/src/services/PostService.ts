import { Db, ObjectId } from "mongodb";
import { db } from "./DatabaseService";
import { EntitiesEnum } from './types';

export enum StatusEnum {
  draft = "draft",
  published = "published",
  archived = "archived"
}

export class PostService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  // Method to get all posts
  async getAllPosts(filters: Record<string, any> = {}) {
    return this.db.collection(EntitiesEnum.posts).find(filters).toArray();
  }

  // Method to create a new post
  async createPost(data: { authorId: string | ObjectId; title: string; content: string, status: StatusEnum }) {
    const createdAt = new Date().toUTCString();
    const createData = {
      ...data,
      createdAt: createdAt,
      updatedAt: createdAt
    };
    const result = await this.db.collection(EntitiesEnum.posts).insertOne(createData);
    return { _id: result.insertedId, ...createData };
  }

  // Method to get a post by ID
  async getPostById(id: string) {
    return this.db.collection(EntitiesEnum.posts).findOne({ _id: new ObjectId(id) });
  }

  // Method to update a post
  async updatePostById(id: string, data: { authorId?: string | ObjectId; title?: string; content?: string, status?: StatusEnum }) {
    const result = await this.db.collection(EntitiesEnum.posts).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { data, updatedAt: new Date().toUTCString() } },
      { returnDocument: "after" }
    );
    return result?.value;
  }

  // Method to delete a post
  async deletePost(id: string) {
    const result = await this.db.collection(EntitiesEnum.posts).deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export const postService = new PostService(db);
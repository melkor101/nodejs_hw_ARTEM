import { Db, ObjectId } from "mongodb";
import { db } from "./DatabaseService.ts";
import { EntitiesEnum } from './types.ts';

export class UserService {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  // Method to get all users
  async getAllUsers(filters: Record<string, any> = {}) {
    return this.db.collection(EntitiesEnum.users).find(filters).toArray();
  }

  // Method to get a user by ID
  async getUserById(id: string) {
    return this.db.collection(EntitiesEnum.users).findOne({ _id: new ObjectId(id) });
  }

  // Method to create a new user
  async createUser(data: { name: string; email: string; age: number }) {
    const result = await this.db.collection(EntitiesEnum.users).insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  // Method to update a user
  async updateUserByyId(id: string, data: { name?: string; email?: string; age?: number }) {
    const result = await this.db.collection(EntitiesEnum.users).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    );
    return result?.value;
  }


  // Method to get a posts by user ID
  async getPostsByUserId(id: string) {
    return this.db.collection(EntitiesEnum.posts).find({ authorId: new ObjectId(id) }).toArray()
  }

  // Method to delete a user
  async deleteUser(id: string) {
    const result = await this.db.collection(EntitiesEnum.users).deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export const userService = new UserService(db);
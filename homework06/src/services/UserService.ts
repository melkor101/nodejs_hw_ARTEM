import { Repository } from "typeorm";
import { User } from "../models/User";
import { appDataSource } from "./appDataSource";

export class UserService {

  private repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  // Method to get all users
  async getAllUsers(filters: Record<string, any> = {}) {
    return this.repository.find(filters);
  }


  // Method to get a user by ID
  async getUserById(id: string) {
    return this.repository.findOneById(id);
  }

  // Method to create a new user
  async createUser(data: { name: string; email: string; age: number }) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.age = data.age;
    return this.repository.save(user);
  }

  // Method to update a user
  async updateUser(id: string, data: { name?: string; email?: string; age: number }) {
    const user = await this.repository.findOneById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found!`)
    }
    user.name = data.name || '';
    user.email = data.email || '';
    user.age = data.age;
    await this.repository.save(user);
  }

  // Method to delete a user
  async deleteUser(id: string) {
    return this.repository.delete(id);
  }
}

export const userService = new UserService();
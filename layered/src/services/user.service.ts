import { User, CreateUserData, UpdateUserData, UserRepository } from "../types/user.types";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserData): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    return this.userRepository.create(data);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already in use by another user");
      }
    }

    const updatedUser = await this.userRepository.update(id, data);
    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const success = await this.userRepository.delete(id);
    if (!success) {
      throw new Error("User not found");
    }
  }
}

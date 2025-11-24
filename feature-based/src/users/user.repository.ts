import { User, CreateUserData, UpdateUserData, UserRepository } from "./user.types";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private nextId = 1;

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findAll(): Promise<User[]> {
    return [...this.users];
  }

  async create(data: CreateUserData): Promise<User> {
    const now = new Date();
    const user: User = {
      id: String(this.nextId++),
      email: data.email,
      name: data.name,
      role: data.role,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(user);
    return user;
  }

  async update(id: string, data: UpdateUserData): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.users[index],
      ...data,
      updatedAt: new Date(),
    };

    this.users[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}

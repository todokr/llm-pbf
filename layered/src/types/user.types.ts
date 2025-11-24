import { z } from "zod";
import { BaseEntity } from "../shared/types";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(["admin", "user"]).default("user"),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type CreateUserData = z.infer<typeof CreateUserSchema>;
export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: "admin" | "user";
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

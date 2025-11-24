import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserSchema, UpdateUserSchema } from "../types/user.types";
import { ApiResponse } from "../shared/types";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = CreateUserSchema.parse(req.body);
      const user = await this.userService.createUser(validatedData);

      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(400).json(response);
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(404).json(response);
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();

      const response: ApiResponse<typeof users> = {
        success: true,
        data: users,
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(500).json(response);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validatedData = UpdateUserSchema.parse(req.body);
      const user = await this.userService.updateUser(id, validatedData);

      const response: ApiResponse<typeof user> = {
        success: true,
        data: user,
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(400).json(response);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);

      const response: ApiResponse<{ message: string }> = {
        success: true,
        data: { message: "User deleted successfully" },
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<never> = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
      res.status(404).json(response);
    }
  }
}

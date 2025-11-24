import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { CreateTaskSchema, UpdateTaskSchema } from "./task.types";
import { ApiResponse } from "../shared/types";

export class TaskController {
  constructor(private taskService: TaskService) {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = CreateTaskSchema.parse(req.body);
      const task = await this.taskService.createTask(validatedData);

      const response: ApiResponse<typeof task> = {
        success: true,
        data: task,
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

  async getTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await this.taskService.getTaskById(id);

      const response: ApiResponse<typeof task> = {
        success: true,
        data: task,
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

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const { projectId, assigneeId } = req.query;

      let tasks;
      if (projectId) {
        tasks = await this.taskService.getTasksByProject(String(projectId));
      } else if (assigneeId) {
        tasks = await this.taskService.getTasksByAssignee(String(assigneeId));
      } else {
        tasks = await this.taskService.getAllTasks();
      }

      const response: ApiResponse<typeof tasks> = {
        success: true,
        data: tasks,
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

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validatedData = UpdateTaskSchema.parse(req.body);
      const task = await this.taskService.updateTask(id, validatedData);

      const response: ApiResponse<typeof task> = {
        success: true,
        data: task,
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

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(id);

      const response: ApiResponse<{ message: string }> = {
        success: true,
        data: { message: "Task deleted successfully" },
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

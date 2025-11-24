import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { CreateProjectSchema, UpdateProjectSchema } from "./project.types";
import { ApiResponse } from "../shared/types";

export class ProjectController {
  constructor(private projectService: ProjectService) {}

  async createProject(req: Request, res: Response): Promise<void> {
    try {
      const validatedData = CreateProjectSchema.parse(req.body);
      const project = await this.projectService.createProject(validatedData);

      const response: ApiResponse<typeof project> = {
        success: true,
        data: project,
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

  async getProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(id);

      const response: ApiResponse<typeof project> = {
        success: true,
        data: project,
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

  async getProjects(req: Request, res: Response): Promise<void> {
    try {
      const { ownerId } = req.query;

      const projects = ownerId
        ? await this.projectService.getProjectsByOwner(String(ownerId))
        : await this.projectService.getAllProjects();

      const response: ApiResponse<typeof projects> = {
        success: true,
        data: projects,
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

  async updateProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const validatedData = UpdateProjectSchema.parse(req.body);
      const project = await this.projectService.updateProject(id, validatedData);

      const response: ApiResponse<typeof project> = {
        success: true,
        data: project,
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

  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.projectService.deleteProject(id);

      const response: ApiResponse<{ message: string }> = {
        success: true,
        data: { message: "Project deleted successfully" },
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

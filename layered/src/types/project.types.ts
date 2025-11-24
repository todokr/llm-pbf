import { z } from "zod";
import { BaseEntity } from "../shared/types";

export const CreateProjectSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  ownerId: z.string(),
  status: z.enum(["active", "completed", "on_hold"]).default("active"),
});

export const UpdateProjectSchema = CreateProjectSchema.partial().omit({ ownerId: true });

export type CreateProjectData = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectData = z.infer<typeof UpdateProjectSchema>;

export interface Project extends BaseEntity {
  name: string;
  description?: string;
  ownerId: string;
  status: "active" | "completed" | "on_hold";
}

export interface ProjectRepository {
  findById(id: string): Promise<Project | null>;
  findByOwnerId(ownerId: string): Promise<Project[]>;
  findAll(): Promise<Project[]>;
  create(data: CreateProjectData): Promise<Project>;
  update(id: string, data: UpdateProjectData): Promise<Project | null>;
  delete(id: string): Promise<boolean>;
}

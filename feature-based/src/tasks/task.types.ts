import { z } from "zod";
import { BaseEntity } from "../shared/types";

export const CreateTaskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  projectId: z.string(),
  assigneeId: z.string().optional(),
  status: z.enum(["todo", "in_progress", "completed"]).default("todo"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  dueDate: z.date().optional(),
});

export const UpdateTaskSchema = CreateTaskSchema.partial().omit({ projectId: true });

export type CreateTaskData = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskData = z.infer<typeof UpdateTaskSchema>;

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  status: "todo" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
}

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  findByAssigneeId(assigneeId: string): Promise<Task[]>;
  findAll(): Promise<Task[]>;
  create(data: CreateTaskData): Promise<Task>;
  update(id: string, data: UpdateTaskData): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}

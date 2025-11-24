import { Task, CreateTaskData, UpdateTaskData, TaskRepository } from "../types/task.types";
import { UserRepository } from "../types/user.types";
import { ProjectRepository } from "../types/project.types";

export class TaskService {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository,
  ) {}

  async createTask(data: CreateTaskData): Promise<Task> {
    const project = await this.projectRepository.findById(data.projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    if (data.assigneeId) {
      const assignee = await this.userRepository.findById(data.assigneeId);
      if (!assignee) {
        throw new Error("Assignee not found");
      }
    }

    return this.taskRepository.create(data);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      throw new Error("Task not found");
    }
    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async getTasksByProject(projectId: string): Promise<Task[]> {
    const project = await this.projectRepository.findById(projectId);
    if (!project) {
      throw new Error("Project not found");
    }

    return this.taskRepository.findByProjectId(projectId);
  }

  async getTasksByAssignee(assigneeId: string): Promise<Task[]> {
    const assignee = await this.userRepository.findById(assigneeId);
    if (!assignee) {
      throw new Error("Assignee not found");
    }

    return this.taskRepository.findByAssigneeId(assigneeId);
  }

  async updateTask(id: string, data: UpdateTaskData): Promise<Task> {
    if (data.assigneeId) {
      const assignee = await this.userRepository.findById(data.assigneeId);
      if (!assignee) {
        throw new Error("Assignee not found");
      }
    }

    const updatedTask = await this.taskRepository.update(id, data);
    if (!updatedTask) {
      throw new Error("Task not found");
    }

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const success = await this.taskRepository.delete(id);
    if (!success) {
      throw new Error("Task not found");
    }
  }
}

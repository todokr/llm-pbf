import { Task, CreateTaskData, UpdateTaskData, TaskRepository } from "../types/task.types";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];
  private nextId = 1;

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null;
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.projectId === projectId);
  }

  async findByAssigneeId(assigneeId: string): Promise<Task[]> {
    return this.tasks.filter((task) => task.assigneeId === assigneeId);
  }

  async findAll(): Promise<Task[]> {
    return [...this.tasks];
  }

  async create(data: CreateTaskData): Promise<Task> {
    const now = new Date();
    const task: Task = {
      id: String(this.nextId++),
      title: data.title,
      description: data.description,
      projectId: data.projectId,
      assigneeId: data.assigneeId,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(task);
    return task;
  }

  async update(id: string, data: UpdateTaskData): Promise<Task | null> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.tasks[index],
      ...data,
      updatedAt: new Date(),
    };

    this.tasks[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
  }
}

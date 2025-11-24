import { Project, CreateProjectData, UpdateProjectData, ProjectRepository } from "../types/project.types";

export class InMemoryProjectRepository implements ProjectRepository {
  private projects: Project[] = [];
  private nextId = 1;

  async findById(id: string): Promise<Project | null> {
    return this.projects.find((project) => project.id === id) || null;
  }

  async findByOwnerId(ownerId: string): Promise<Project[]> {
    return this.projects.filter((project) => project.ownerId === ownerId);
  }

  async findAll(): Promise<Project[]> {
    return [...this.projects];
  }

  async create(data: CreateProjectData): Promise<Project> {
    const now = new Date();
    const project: Project = {
      id: String(this.nextId++),
      name: data.name,
      description: data.description,
      ownerId: data.ownerId,
      status: data.status,
      createdAt: now,
      updatedAt: now,
    };

    this.projects.push(project);
    return project;
  }

  async update(id: string, data: UpdateProjectData): Promise<Project | null> {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.projects[index],
      ...data,
      updatedAt: new Date(),
    };

    this.projects[index] = updated;
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) return false;

    this.projects.splice(index, 1);
    return true;
  }
}

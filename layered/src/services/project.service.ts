import { Project, CreateProjectData, UpdateProjectData, ProjectRepository } from "../types/project.types";
import { UserRepository } from "../types/user.types";

export class ProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private userRepository: UserRepository,
  ) {}

  async createProject(data: CreateProjectData): Promise<Project> {
    const owner = await this.userRepository.findById(data.ownerId);
    if (!owner) {
      throw new Error("Owner not found");
    }

    return this.projectRepository.create(data);
  }

  async getProjectById(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new Error("Project not found");
    }
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async getProjectsByOwner(ownerId: string): Promise<Project[]> {
    const owner = await this.userRepository.findById(ownerId);
    if (!owner) {
      throw new Error("Owner not found");
    }

    return this.projectRepository.findByOwnerId(ownerId);
  }

  async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    const updatedProject = await this.projectRepository.update(id, data);
    if (!updatedProject) {
      throw new Error("Project not found");
    }

    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    const success = await this.projectRepository.delete(id);
    if (!success) {
      throw new Error("Project not found");
    }
  }
}

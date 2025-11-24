import { UserService } from "./user.service";
import { ProjectService } from "./project.service";
import { TaskService } from "./task.service";
import { userRepository, projectRepository, taskRepository } from "../repositories";

export const userService = new UserService(userRepository);
export const projectService = new ProjectService(projectRepository, userRepository);
export const taskService = new TaskService(taskRepository, userRepository, projectRepository);

export { UserService, ProjectService, TaskService };

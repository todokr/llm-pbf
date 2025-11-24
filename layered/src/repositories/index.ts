import { InMemoryUserRepository } from "./user.repository";
import { InMemoryProjectRepository } from "./project.repository";
import { InMemoryTaskRepository } from "./task.repository";

export const userRepository = new InMemoryUserRepository();
export const projectRepository = new InMemoryProjectRepository();
export const taskRepository = new InMemoryTaskRepository();

export { InMemoryUserRepository, InMemoryProjectRepository, InMemoryTaskRepository };

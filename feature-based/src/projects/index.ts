import { Router } from "express";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { InMemoryProjectRepository } from "./project.repository";
import { userRepository } from "../users";

const projectRepository = new InMemoryProjectRepository();
const projectService = new ProjectService(projectRepository, userRepository);
const projectController = new ProjectController(projectService);

const projectRouter = Router();

projectRouter.post("/", (req, res) => projectController.createProject(req, res));
projectRouter.get("/", (req, res) => projectController.getProjects(req, res));
projectRouter.get("/:id", (req, res) => projectController.getProject(req, res));
projectRouter.put("/:id", (req, res) => projectController.updateProject(req, res));
projectRouter.delete("/:id", (req, res) => projectController.deleteProject(req, res));

export { projectRouter, projectService, projectRepository };
export * from "./project.types";

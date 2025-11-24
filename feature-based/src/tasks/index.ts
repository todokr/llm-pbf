import { Router } from "express";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { InMemoryTaskRepository } from "./task.repository";
import { userRepository } from "../users";
import { projectRepository } from "../projects";

const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskService(taskRepository, userRepository, projectRepository);
const taskController = new TaskController(taskService);

const taskRouter = Router();

taskRouter.post("/", (req, res) => taskController.createTask(req, res));
taskRouter.get("/", (req, res) => taskController.getTasks(req, res));
taskRouter.get("/:id", (req, res) => taskController.getTask(req, res));
taskRouter.put("/:id", (req, res) => taskController.updateTask(req, res));
taskRouter.delete("/:id", (req, res) => taskController.deleteTask(req, res));

export { taskRouter, taskService, taskRepository };
export * from "./task.types";

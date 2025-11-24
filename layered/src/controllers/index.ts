import { Router } from "express";
import { UserController } from "./user.controller";
import { ProjectController } from "./project.controller";
import { TaskController } from "./task.controller";
import { userService, projectService, taskService } from "../services";

const userController = new UserController(userService);
const projectController = new ProjectController(projectService);
const taskController = new TaskController(taskService);

const userRouter = Router();
userRouter.post("/", (req, res) => userController.createUser(req, res));
userRouter.get("/", (req, res) => userController.getUsers(req, res));
userRouter.get("/:id", (req, res) => userController.getUser(req, res));
userRouter.put("/:id", (req, res) => userController.updateUser(req, res));
userRouter.delete("/:id", (req, res) => userController.deleteUser(req, res));

const projectRouter = Router();
projectRouter.post("/", (req, res) => projectController.createProject(req, res));
projectRouter.get("/", (req, res) => projectController.getProjects(req, res));
projectRouter.get("/:id", (req, res) => projectController.getProject(req, res));
projectRouter.put("/:id", (req, res) => projectController.updateProject(req, res));
projectRouter.delete("/:id", (req, res) => projectController.deleteProject(req, res));

const taskRouter = Router();
taskRouter.post("/", (req, res) => taskController.createTask(req, res));
taskRouter.get("/", (req, res) => taskController.getTasks(req, res));
taskRouter.get("/:id", (req, res) => taskController.getTask(req, res));
taskRouter.put("/:id", (req, res) => taskController.updateTask(req, res));
taskRouter.delete("/:id", (req, res) => taskController.deleteTask(req, res));

export { userRouter, projectRouter, taskRouter };

import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { InMemoryUserRepository } from "./user.repository";

const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post("/", (req, res) => userController.createUser(req, res));
userRouter.get("/", (req, res) => userController.getUsers(req, res));
userRouter.get("/:id", (req, res) => userController.getUser(req, res));
userRouter.put("/:id", (req, res) => userController.updateUser(req, res));
userRouter.delete("/:id", (req, res) => userController.deleteUser(req, res));

export { userRouter, userService, userRepository };
export * from "./user.types";

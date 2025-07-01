import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema, loginUserSchema, updateUserSchema } from "./user.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/register", validate(createUserSchema), userController.register);
userRoutes.post("/login", validate(loginUserSchema), userController.login);
userRoutes.get("/users", authMiddleware, adminMiddleware, userController.findAll);
userRoutes.put("/users/:id", authMiddleware, adminMiddleware, validate(updateUserSchema), userController.update);

export { userRoutes };
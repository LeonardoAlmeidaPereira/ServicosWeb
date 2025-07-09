import { Router } from "express";
import { UserController } from "./user.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createUserSchema, loginUserSchema, updateUserSchema } from "./user.schema";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { authPage } from "../../middlewares/authPage.middleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.get("/register", userController.renderRegister);
userRoutes.post("/register", validate(createUserSchema), userController.register);
userRoutes.get("/login", userController.renderLogin);
userRoutes.post("/login", validate(loginUserSchema), userController.login);
userRoutes.get('/logout', userController.logout);
userRoutes.get("/main", authPage, userController.renderMain);
userRoutes.get("/", authMiddleware, adminMiddleware, userController.findAll);
userRoutes.put("/:id", authMiddleware, adminMiddleware, validate(updateUserSchema), userController.update);

export { userRoutes };
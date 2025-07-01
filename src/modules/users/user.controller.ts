import { Request, Response, NextFunction } from "express"; // Importe o NextFunction
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

export class UserController {
    private userService: UserService;

    constructor() {
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.register(req.body);
            return res.status(201).json(user);
        } catch (error) {
            return next(error); // Passa o erro para o middleware
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.userService.login(req.body);
            return res.status(200).json(result);
        } catch (error) {
            return next(error); // Passa o erro para o middleware
        }
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return next(error); // Passa o erro para o middleware
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.update(id, req.body);
            return res.status(200).json(user);
        } catch (error) {
            return next(error); // Passa o erro para o middleware
        }
    }
}
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

export class UserController {
    private userService: UserService;

    constructor() {
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }

    // Convertido para Arrow Function
    register = async (req: Request, res: Response) => {
        const user = await this.userService.register(req.body);
        return res.status(201).json(user);
    }

    // Convertido para Arrow Function
    login = async (req: Request, res: Response) => {
        const result = await this.userService.login(req.body);
        return res.status(200).json(result);
    }

    // Convertido para Arrow Function
    findAll = async (req: Request, res: Response) => {
        const users = await this.userService.findAll();
        return res.status(200).json(users);
    }

    // Convertido para Arrow Function
    update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await this.userService.update(id, req.body);
        return res.status(200).json(user);
    }
}
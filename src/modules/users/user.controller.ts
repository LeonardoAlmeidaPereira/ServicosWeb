import { Request, Response } from "express";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";

export class UserController {
    private userService: UserService;

    constructor() {
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }

    async register(req: Request, res: Response) {
        const user = await this.userService.register(req.body);
        return res.status(201).json(user);
    }

    async login(req: Request, res: Response) {
        const result = await this.userService.login(req.body);
        return res.status(200).json(result);
    }

    async findAll(req: Request, res: Response) {
        const users = await this.userService.findAll();
        return res.status(200).json(users);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.userService.update(id, req.body);
        return res.status(200).json(user);
    }
}
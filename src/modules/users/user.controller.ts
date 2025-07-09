import { Request, Response, NextFunction } from "express"; // Importe o NextFunction
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import render from "liquidjs/dist/tags/render";
import { error } from "console";

export class UserController {
    private userService: UserService;

    constructor() {
        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }

    renderRegister = (req: Request, res: Response) => {
        return res.render("register");
    }

    register = async (req: Request, res: Response) => {
        try {
            await this.userService.register(req.body);
            return res.redirect("/users/login");
        } catch (error) {
            return res.render("register", { error });
        }
    }

    renderLogin = (req: Request, res: Response) => {
        return res.render("login");
    }

    login = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.login(req.body)
            req.session.userId = user.id;
            req.session.userRole = user.role;
            return res.redirect("/users/main");
        } catch (error) {
            return res.render("login", { error });
        }
    }

    logout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao destruir a sessão:", err);
            return next(err);
        }
        res.redirect('/users/login');
    });
}

    renderMain = async (req: Request, res: Response) => {
        const userId = req.session.userId;
        const user = await this.userService.findById(userId);
        return res.render("main", { user });
    }

    findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const user = await this.userService.update(id, req.body);
            return res.status(200).json(user);
        } catch (error) {
            return next(error);
        }
    }
}
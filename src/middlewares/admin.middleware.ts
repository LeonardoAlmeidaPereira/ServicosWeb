import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/AppError";

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.user.role !== "admin") {
        throw new AppError("Acesso não autorizado", 403);
    }

    next();
}
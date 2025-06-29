import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../shared/errors/AppError";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new AppError("Token de autenticação não informado", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id, role } = decoded as { id: string, role: string };

        req.user = { id, role };
        next();
    } catch (error) {
        throw new AppError("Token inválido", 401);
    }
}
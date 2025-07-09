import { Request, Response, NextFunction } from 'express';

export const authPage = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.userId) {
        return res.redirect('/users/login');
    }
    next();
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('token',token)
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log('decoded',decoded);
        res.locals.jwtPayload = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
};
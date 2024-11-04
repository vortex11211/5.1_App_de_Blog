import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('token', token); // Log para depuración
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        console.log('decoded', decoded); // Log para depuración
        res.locals.jwtPayload = decoded;
        next();
    } catch (error) {
        console.error('Error decoding token:', error); // Log para depuración
        res.status(403).json({ message: 'Forbidden' });
    }

};



/*import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        res.locals.jwtPayload = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Forbidden' });
    }
};*/


import { Request, Response, NextFunction } from "express";
import { AuthorizeUser } from "../usecases/users/authorization/authorization-user.usecase";
import { AuthorizeUserDTO } from "../usecases/users/authorization/authorization-user.dto";
import { UserRepositoryPrisma } from "../infrastructure/repositories/user.repository.prisma";

const userRepository = new UserRepositoryPrisma();

export const checkAction = (action: string) => {
       return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!res.locals.jwtPayload) {
                res.status(403).json({ message: 'Forbidden: Missing JWT payload' });
                return;
            }

            const { userId, userRole } = res.locals.jwtPayload; 
           
            const authorizeUser = new AuthorizeUser(userRepository);
            const dto: AuthorizeUserDTO = { userId, userRole, action };
            const hasAccess = await authorizeUser.execute(dto);
            if (!hasAccess) {
                res.status(403).json({ message: 'You do not have permission to perform this action' });
                return;
            }
            next();
        } catch (error) {
            const typedError = error as Error;
            res.status(403).send({ message: typedError.message });
        }
    };
};
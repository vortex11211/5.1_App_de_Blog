import { Request, Response, NextFunction } from "express";
import { AuthorizeUser } from "../usecases/users/authorization/authorization-user.usecase";
import { AuthorizeUserDTO } from "../usecases/users/authorization/authorization-user.dto";
import { UserRepositoryPrisma } from "../infrastructure/repositories/user.repository.prisma";

const userRepository = new UserRepositoryPrisma();

export const checkAction = (action: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const userId = res.locals.jwtPayload.userId; // Obtener el ID del usuario del payload del JWT
        const userRole = res.locals.jwtPayload.userRole;
        // Obtener el rol del usuario del payload del JWT
        const authorizeUser = new AuthorizeUser(userRepository); // Instanciar el caso de uso

        try {
            const dto: AuthorizeUserDTO = { userId, userRole, action };
            const hasAccess = await authorizeUser.execute(dto);
            if (!hasAccess) {
                throw new Error('You do not have permission to perfom this action');
            }
            next();
        } catch (error) {
            const typedError = error as Error
            res.status(403).send({ message: typedError.message });
        }
    };
}

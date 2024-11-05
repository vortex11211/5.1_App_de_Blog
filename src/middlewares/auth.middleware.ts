import { Request, Response, NextFunction } from "express";
import { AuthorizeUser } from "../usecases/users/authorization/authorization-user.usecase";
import { AuthorizeUserDTO } from "../usecases/users/authorization/authorization-user.dto";
import { UserRepositoryPrisma } from "../infrastructure/repositories/user.repository.prisma";
import { PublicationRepositoryPrisma } from "../infrastructure/repositories/publication.repository.prisma";

const userRepository = new UserRepositoryPrisma();

export const checkAction = (...actions: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (!res.locals.jwtPayload) {
                res.status(403).json({ message: 'Forbidden: Missing JWT payload' });
                return;
            }

            const { userId, userRole } = res.locals.jwtPayload;
            console.log(`UserId: ${userId}, UserRole: ${userRole}`);
            const authorizeUser = new AuthorizeUser(userRepository);

            let hasPermission = false;
            for (const action of actions) {
                const dto: AuthorizeUserDTO = { userId, userRole, action };
                const actionPermission = await authorizeUser.execute(dto);
                console.log(`Action: ${action}, Permission: ${actionPermission}`);
                if (actionPermission) {
                    hasPermission = true;
                    break;
                }
            }

            if (!hasPermission) {
                res.status(403).json({ message: 'You do not have permission to perform this action' });
                return;
            }

            // Verificar si la acción implica una publicación
            const publicationId = req.body.publicationId || req.params.publicationId;
            if (publicationId && !actions.includes('like')) {
                // Verificar la propiedad de la publicación
                const publicationRepository = new PublicationRepositoryPrisma();
                const publication = await publicationRepository.findById(publicationId);
                if (publication && userRole !== 'admin' && publication.authorId !== userId) {
                    res.status(403).json({ message: 'You do not own this publication' });
                    return;
                }
            }

            next();
        } catch (error) {
            const typedError = error as Error;
            console.error(`Error in checkAction middleware: ${error}`)
            res.status(403).send({ message: typedError.message });
        }
    };
};





import { AuthorizeUser } from '../../../usecases/users/authorization/authorization-user.usecase';
import { Request, Response } from 'express';
import { UserRepositoryPrisma } from '../../repositories/user.repository.prisma';
import { AuthorizeUserDTO } from '../../../usecases/users/authorization/authorization-user.dto';

// Inicializa el repositorio y el caso de uso
const userRepository = new UserRepositoryPrisma();
const authorizeUserUseCase = new AuthorizeUser(userRepository);

export const authorizeUserController = async (req: Request, res: Response) => {
    try {
        // Obtiene los datos necesarios del JWT o de la solicitud
        const userId = req.user.userId; // Asumiendo que el ID del usuario está en el JWT
        const userRole = req.user.userRole;   // Asumiendo que el rol del usuario también está en el JWT
        const resource = req.params.resource; // El recurso al que se quiere acceder, podría venir de la URL

        // Crea el DTO para autorización
        const dto: AuthorizeUserDTO = { userId, userRole, resource };

        // Ejecuta el caso de uso de autorización
        const hasAccess = await authorizeUserUseCase.execute(dto);

        if (!hasAccess) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Si se permite el acceso, continúa con la lógica de la ruta
        res.status(200).json({ message: 'Access granted' });
    } catch (error) {
        const typedError = error as Error;
        res.status(500).json({ message: typedError.message });
    }
};

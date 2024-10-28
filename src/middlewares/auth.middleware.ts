import { Request, Response, NextFunction } from "express";
import { AuthorizeUser } from "../usecases/users/authorization/authorization-user.usecase";
import { AuthorizeUserDTO } from "../usecases/users/authorization/authorization-user.dto";
**import { UserGateway } from "../domain/gateways/user.gateway";
/*export const checkRole = (requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.jwtPayload.userId;
        const userRole= res.locals.jwtPayload.userRole; // Obtener el ID del usuario del payload del JWT
        const authorizeUser = new AuthorizeUser(userGateway); // Instanciar el caso de uso

        try {
            const dto: AuthorizeUserDTO = { userId,userRole, action };
            await authorizeUser.execute(dto); // Ejecutar el caso de uso
            next(); // El usuario está autorizado, continuar con la siguiente función
        } catch (error) {
            res.status(403).send({ message: error.message }); // Responder con 403 si no está autorizado
        }
    };
};*/

export const checkAction = (action: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      
        const userId = res.locals.jwtPayload.userId; // Obtener el ID del usuario del payload del JWT
        const userRole = res.locals.jwtPayload.userRole; // Obtener el rol del usuario del payload del JWT
        const authorizeUser = new AuthorizeUser(userGateway); // Instanciar el caso de uso

        try {
            const dto: AuthorizeUserDTO = { userId,userRole, action };
            await authorizeUser.execute(dto); // Ejecutar el caso de uso
            next(); // El usuario está autorizado, continuar con la siguiente función
        } catch (error) {
            res.status(403).send({ message: error.message }); // Responder con 403 si no está autorizado
        }
    };
};
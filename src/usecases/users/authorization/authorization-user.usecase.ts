import { AuthorizeUserDTO } from "./authorization-user.dto";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { Role } from "../../../domain/entities/user.entity";

export interface AuthorizeUserUseCase {
    execute(dto: AuthorizeUserDTO): Promise<boolean>;
}

export class AuthorizeUser implements AuthorizeUserUseCase {
    private userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    private checkAccess(role: Role, action: string): boolean {
        // Aquí se puede implementar la lógica de autorización según roles
        const rolePermissions = {
            admin: ['viewAllUsers', 'banUser', 'elimnatePublication', 'view', 'create', 'edit', 'delete', 'softDelete', 'recover'],
            simpleUser: ['viewOwn', 'create', 'editOwn', 'softDeleteOwn', 'recoverOwn', 'like'],
        };

        return rolePermissions[role]?.includes(action) || false;
    }
    
    public async execute(dto: AuthorizeUserDTO): Promise<boolean> {
        const user = await this.userGateway.findById(dto.userId);
        console.log('queusuarioes',user)
        if (!user) {
            throw new Error('User not found');
        }

        // Verificar si el rol del usuario tiene acceso al recurso
        const hasAccess = this.checkAccess(user.role, dto.action);
        return hasAccess;
    }

    
}
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

    private checkAccess(userId: number, role: Role, action: string): boolean {
        const rolePermissions = {
            admin: ['viewAllUsers', 'banUser', 'eliminatePublication', 'view', 'create', 'edit', 'softDelete', 'recover', 'like','editprofile','getpublication'],
            simpleUser: ['viewOwn', 'create', 'editOwn', 'softDeleteOwn', 'like','view','editprofile','getpublication'],
        };
        console.log(`Checking access for role: ${role}, action: ${action}`);

        return rolePermissions[role]?.includes(action) || false;
    }

    public async execute(dto: AuthorizeUserDTO): Promise<boolean> {
        const user = await this.userGateway.findById(dto.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const hasAccess = this.checkAccess(user.id, user.role, dto.action);
        return hasAccess;
    }


}

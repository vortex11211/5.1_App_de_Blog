import { RegisterUserDTO } from './register-user.dto';
import { UserGateway } from '../../domain/gateways/user.gateway';
import { User } from '../../domain/entities/user.entity';
import { Role } from '../../domain/entities/user.entity';
export interface RegisterUserUseCase {
    execute(dto: RegisterUserDTO): Promise<void>;
}

export class RegisterUser implements RegisterUserUseCase {
    private userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }
    public async execute(dto: RegisterUserDTO): Promise<void> {
        // Validar que el email no exista ya en la base de datos
        const existingUser = await this.userGateway.findByEmail(dto.email);
        if (existingUser) {
            throw new Error('User with this email already exists.');
        }
        const role = dto.role as Role;
        // Crear usuario y guardarlo en la base de datos
        const user = User.create(dto.username, dto.email, dto.password, role);
        await this.userGateway.save(user);
    }
}
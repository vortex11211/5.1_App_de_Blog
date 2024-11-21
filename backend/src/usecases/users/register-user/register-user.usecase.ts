import { RegisterUserDTO } from './register-user.dto';
import { UserGateway } from '../../../domain/gateways/user.gateway';
import { User } from '../../../domain/entities/user.entity';
import { Role } from '../../../domain/entities/user.entity';
import bcrypt from 'bcryptjs'


const ADMIN_KEY= process.env.ADMIN_KEY;

export interface RegisterUserUseCase {
    execute(dto: RegisterUserDTO): Promise<void>;
}

export class RegisterUser implements RegisterUserUseCase {
    private userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }
    public async execute(dto: RegisterUserDTO): Promise<void> {
        
        const existingUser = await this.userGateway.findByEmail(dto.email);
        if (existingUser) {
            const error = new Error('User with this email already exists.');
            error.name = 'Conflict';
            throw error;
        }

        const existingUsername = await this.userGateway.findByUsername(dto.username);
        if (existingUsername) {
            const error = new Error('User with this username already exists.');
            error.name = 'Conflict';
            throw error;
        }

        if (dto.role ==='admin' && dto.adminKey !== ADMIN_KEY){
            throw new Error('Invalid admin Key')
        }
        const hashedPassword= await bcrypt.hash(dto.password,10);

        const role = dto.role as Role;
        
        const user = User.create(dto.username, dto.email, hashedPassword, role);
        await this.userGateway.save(user);
    }
}
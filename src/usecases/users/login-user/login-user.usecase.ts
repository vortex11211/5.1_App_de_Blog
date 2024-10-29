import { LoginUserDTO } from "./login-user.dto";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



/*export interface LoginUserUseCase {
    execute(dto: LoginUserDTO): Promise<string>;
}

export class LoginUser implements LoginUserUseCase {
    private userGateway: UserGateway;
    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    public async execute(dto: LoginUserDTO): Promise<string> {
        const user = await this.userGateway.findByEmail(dto.email);
        if (!user) {
            throw new Error('Invalid email')
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password')
        }
        const SECRET_KEY = String(process.env.JWT_SECRET_KEY);
        const token = jwt.sign({ userId: user.id, userRole: user.role }, SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
}*/
/*
import { User } from "../../../domain/entities/user.entity";

export interface LoginUserUseCase {
    execute(dto: LoginUserDTO): Promise<User>;
}

export class LoginUser implements LoginUserUseCase {
    private userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    public async execute(dto: LoginUserDTO): Promise<User> {
        const user = await this.userGateway.findByEmail(dto.email);
        if (!user) {
            throw new Error('Invalid email');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return user;
    }
}*/


export interface LoginUserUseCase {
    execute(dto: LoginUserDTO): Promise<string>;
}

export class LoginUser implements LoginUserUseCase {
    private userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    public async execute(dto: LoginUserDTO): Promise<string> {
        const user = await this.userGateway.findByEmail(dto.email);
        if (!user) {
            throw new Error('Invalid email');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const SECRET_KEY = String(process.env.JWT_SECRET_KEY);
        if (!SECRET_KEY) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ userId: user.id, userRole: user.role }, SECRET_KEY, { expiresIn: '1h' });
        return token;
    }
}

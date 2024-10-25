import { LoginUserDTO } from "./login-user.dto";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



export interface LoginUserUseCase {
    execute(dto: LoginUserDTO): Promise<string>;
}

export class LoginUser implements LoginUserUseCase {
    private userGateway: UserGateway;
    constructor(userGateway: UserGateway){
        this.userGateway = userGateway;
    }

    public async execute(dto:LoginUserDTO):Promise<string>{
const user=await this.userGateway.findByEmail(dto.email);
if (!user){
    throw new Error('Invalid email or password')
}
const isPasswordValid= await bcrypt.compare(dto.password,user.password);
if (!isPasswordValid){
    throw new Error('Invalid email or password')
}
const token=jwt.sign({userId:user.id}, 'your-secret-key',{expiresIn:'1h'});
return token;
    }
}
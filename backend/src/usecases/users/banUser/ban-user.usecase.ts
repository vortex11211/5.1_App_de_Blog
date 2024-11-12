import { User } from "@prisma/client";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import { BanUserDTO } from "./ban-user.dto";

export interface BanUserUseCase{
    execute(dto: BanUserDTO):Promise<User>
}

export class BanUser implements BanUserUseCase{
    private userGateway: UserGateway;
    constructor(userGateway : UserGateway){
        this.userGateway=userGateway;
    }


    async execute(dto: BanUserDTO): Promise<User> {
        const user = await this.userGateway.findById(dto.userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.banUser(); // Cambiar el estado del usuario
        await this.userGateway.banUser(user); 
        return user;
    }
}
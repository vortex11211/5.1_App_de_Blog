import { UserGateway } from "../../../domain/gateways/user.gateway";
import { BanUserDTO } from "./ban-user.dto";
import { User } from "../../../domain/entities/user.entity";


export class BanUser {
    private userRepository: UserGateway;
    constructor(userRepository: UserGateway) {
        this.userRepository = userRepository;
    }

    async execute(dto: BanUserDTO): Promise<User> {
        const user = await this.userRepository.findById(dto.userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.banUser();
        await this.userRepository.banUser(user);
        return user;
    }
}
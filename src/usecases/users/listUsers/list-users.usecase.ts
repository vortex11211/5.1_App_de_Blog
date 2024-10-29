import { UserGateway } from "../../../domain/gateways/user.gateway";
import { User } from "../../../domain/entities/user.entity";

export class ListUsers {
    private userRepository: UserGateway;

    constructor(userRepository: UserGateway) {
        this.userRepository = userRepository;
    }

    public async execute(): Promise<User[]> {
        return this.userRepository.list();
    }
}

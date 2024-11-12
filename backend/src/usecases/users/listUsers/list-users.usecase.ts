import { UserGateway } from "../../../domain/gateways/user.gateway";
import { User } from "../../../domain/entities/user.entity";
import { ListUsersDTO } from "./list-users.dto";

export class ListUsers {
    private userRepository: UserGateway;

    constructor(userRepository: UserGateway) {
        this.userRepository = userRepository;
    }

    public async execute(dto: ListUsersDTO): Promise<User[]> {
        return this.userRepository.list();

    }
}

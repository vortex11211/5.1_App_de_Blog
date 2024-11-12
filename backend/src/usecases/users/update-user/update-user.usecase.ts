import { UpdateUserProfileDTO } from "./update-user.dto";
import { UserGateway } from "../../../domain/gateways/user.gateway";
import bcrypt from 'bcryptjs'

export interface UpdateUserProfileUseCase {
    execute(dto: UpdateUserProfileDTO): Promise<void>;
}

export class UpdateUserProfile implements UpdateUserProfileUseCase {
    private userGateway: UserGateway;

    constructor(userGateway: UserGateway) {
        this.userGateway = userGateway;
    }

    public async execute(dto: UpdateUserProfileDTO): Promise<void> {
        const user = await this.userGateway.findById(dto.userId);
        if (!user) {
            throw new Error('User not found');
        }
        if (dto.oldPassword && dto.newPassword) {
            const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
            if (!isMatch) {
                throw new Error('old password is incorrect');
            }
            const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
            user.updatePassword(hashedPassword);
        }
        if (dto.username) {
            user.updateUsername(dto.username);
        }
        await this.userGateway.update(user);
    }



}
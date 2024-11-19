import { RegisterUser } from '../../usecases/users/register-user/register-user.usecase';
import { Request, Response } from 'express';
import { UserRepositoryPrisma } from '../repositories/user.repository.prisma';

import { RegisterUserDTO } from '../../usecases/users/register-user/register-user.dto';
import { ListUsers } from '../../usecases/users/listUsers/list-users.usecase';
import { ListUsersDTO } from '../../usecases/users/listUsers/list-users.dto';

import { BanUserDTO } from '../../usecases/users/banUser/ban-user.dto';
import { BanUser } from '../../usecases/users/banUser/ban-user.usecase';

import { UpdateUserProfileDTO } from '../../usecases/users/update-user/update-user.dto';
import { UpdateUserProfile } from '../../usecases/users/update-user/update-user.usecase';


const userRepository = new UserRepositoryPrisma();

const registerUserUseCase = new RegisterUser(userRepository);

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const dto: RegisterUserDTO = req.body;
        await registerUserUseCase.execute(dto);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message });
    }
};




const listUsersUseCase = new ListUsers(userRepository);
export const listUsersController = async (req: Request, res: Response) => {
    try {
        const dto: ListUsersDTO = {};
        const users = await listUsersUseCase.execute(dto);
        res.status(200).json({ users });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message });
    }
};

const banUserUseCase = new BanUser(userRepository);

export const banUserController = async (req: Request, res: Response) => {
    try {
        const dto: BanUserDTO = req.body;
        const bannedUser = await banUserUseCase.execute(dto);
        res.status(200).json({ message: `User ${bannedUser.banned ? 'banned' : 'unbanned'} successfully`, user: bannedUser });
    } catch (error) {
        const typedError = error as Error;
        if (typedError.message.includes("User not found")) {
            res.status(404).json({ message: typedError.message });
        } else if (typedError.message.includes("already exists")) {
            res.status(400).json({ message: typedError.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
}

const updateUserProfileUseCase = new UpdateUserProfile(userRepository);

export const updateUserProfileController = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.jwtPayload.userId;
        const { username, oldPassword, newPassword } = req.body;

        const dto: UpdateUserProfileDTO = { userId, username, oldPassword, newPassword };
        await updateUserProfileUseCase.execute(dto);

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        const typedError = error as Error;
        res.status(500).json({ message: 'error updating profile', error: typedError.message })
    }
}


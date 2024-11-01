/*import { RegisterUser } from '../../../usecases/users/register-user/register-user.usecase';
import { Request, Response } from 'express';
import { UserRepositoryPrisma } from '../../repositories/user.repository.prisma';

import { RegisterUserDTO } from '../../../usecases/users/register-user/register-user.dto';
import { ListUsers } from '../../../usecases/users/listUsers/list-users.usecase';

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
        console.log('List Users Controller Called');
        const users = await listUsersUseCase.execute();
        console.log('users found', users);
        res.status(200).json({ users });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message })
    }
}*/

import { RegisterUser } from '../../../usecases/users/register-user/register-user.usecase';
import { Request, Response } from 'express';
import { UserRepositoryPrisma } from '../../repositories/user.repository.prisma';

import { RegisterUserDTO } from '../../../usecases/users/register-user/register-user.dto';
import { ListUsers } from '../../../usecases/users/listUsers/list-users.usecase';
import { ListUsersDTO } from '../../../usecases/users/listUsers/list-users.dto';

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
    console.log('List Users Controller Called'); // Log para verificar si el controlador es llamado
    try {
        const dto:ListUsersDTO={};
        const users = await listUsersUseCase.execute(dto);
        console.log('users found', users); // Log para verificar si se recuperan usuarios
        res.status(200).json({ users });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message });
    }
};

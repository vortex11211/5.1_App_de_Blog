import { LoginUser } from '../../../usecases/login-user/login-user.usecase';
import { Request, Response } from 'express';
import { UserRepositoryPrisma } from '../../repositories/user.repository.prisma';
import { LoginUserDTO } from '../../../usecases/login-user/login-user.dto';

const userRepository = new UserRepositoryPrisma();
const loginUserUseCase = new LoginUser(userRepository);

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const dto: LoginUserDTO = req.body;
        const token = await loginUserUseCase.execute(dto);
        res.status(200).json({ token });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message });
    }
};

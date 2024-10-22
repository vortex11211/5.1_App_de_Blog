import { LikePublication } from '../../../usecases/like-publication/like-publication.usecase';
import { Request, Response } from 'express';
import { LikeRepositoryPrisma } from '../../repositories/like.repository.prisma';
import { LikePublicationDTO } from '../../../usecases/like-publication/like-publication.dto';

const likeRepository = new LikeRepositoryPrisma();
const likePublicationUseCase = new LikePublication(likeRepository);

export const likePublicationController = async (req: Request, res: Response) => {
    try {
        const dto: LikePublicationDTO = req.body;
        await likePublicationUseCase.execute(dto);
        res.status(201).json({ message: 'Like processed successfully' });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message });
    }
};

import { FavoritePublication } from '../../../usecases/publications/favorite-publication/favorite-publication.usecase';
import { Request, Response } from 'express';
import { FavoriteRepositoryPrisma } from '../../repositories/favorite.repository.prisma';
import { FavoritePublicationDTO } from '../../../usecases/publications/favorite-publication/favorite-publication.dto';

const favoriteRepository = new FavoriteRepositoryPrisma();
const favoritePublicationUseCase = new FavoritePublication(favoriteRepository);

export const favoritePublicationController = async (req: Request, res: Response) => {
    try {
const {publicationId}=req.body;
const userId = res.locals.jwtPayload.userId;

        const dto: FavoritePublicationDTO = {userId,publicationId}
        await favoritePublicationUseCase.execute(dto);
        res.status(201).json({ message: 'Favorite processed successfully' });
    } catch (error) {
        const typedError = error as Error;
        if (typedError.message === "PublicationNotFound") {
            res.status(404).json({ message: 'Publication not found' });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }

    }
};




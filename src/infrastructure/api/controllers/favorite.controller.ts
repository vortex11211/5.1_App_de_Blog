/*import { FavoritePublication } from '../../../usecases/favorite-publication/favorite-publication.usecase';
import { Request, Response } from 'express';
import { FavoriteRepositoryPrisma } from '../../repositories/favorite.repository.prisma';
import { FavoritePublicationDTO } from '../../../usecases/favorite-publication/favorite-publication.dto';

const likeRepository = new FavoriteRepositoryPrisma();
const likePublicationUseCase = new FavoritePublication(likeRepository);

export const favoritePublicationController = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body);
        const dto: FavoritePublicationDTO = req.body;

        const existingFavorite = await likeRepository.findByUserAndPublication(dto.userId, dto.publicationId);

        if (existingFavorite) {
            return res.status(400).json({ message: 'Favorite already exists' });
        }

        await likePublicationUseCase.execute(dto);
        res.status(201).json({ message: 'Like processed successfully' });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message });
    }
};*/

/*import { Request, Response } from 'express';
import { FavoriteRepositoryPrisma } from '../../repositories/favorite.repository.prisma';

const favoriteRepository = new FavoriteRepositoryPrisma();

export const favoritePublicationController = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body); // Log para verificar el body
        const { userId, publicationId } = req.body;
        await favoriteRepository.save({ userId, publicationId, createdAt: new Date() });
        res.status(201).json({ message: 'Favorite processed successfully' });
    } catch (error) {
        const typedError = error as Error;
        console.error('Error:', typedError.message); // Log del error
        res.status(400).json({ message: typedError.message });
    }
};*/

import { FavoritePublication } from '../../../usecases/favorite-publication/favorite-publication.usecase';
import { Request, Response } from 'express';
import { FavoriteRepositoryPrisma } from '../../repositories/favorite.repository.prisma';
import { FavoritePublicationDTO } from '../../../usecases/favorite-publication/favorite-publication.dto';

const favoriteRepository = new FavoriteRepositoryPrisma();
const favoritePublicationUseCase = new FavoritePublication(favoriteRepository);

export const favoritePublicationController = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body); // Log para verificar el body
        const dto: FavoritePublicationDTO = req.body;
        await favoritePublicationUseCase.execute(dto);
        res.status(201).json({ message: 'Favorite processed successfully' });
    } catch (error) {
        const typedError = error as Error;
        console.error('Error:', typedError.message); // Log del error
        res.status(400).json({ message: typedError.message });
    }
};




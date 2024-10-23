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
        console.error('Error:', typedError.message); 
        res.status(400).json({ message: typedError.message });
    }
};




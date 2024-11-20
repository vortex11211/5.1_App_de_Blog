import { Request, Response } from 'express';
import { PublicationRepositoryPrisma } from '../repositories/publication.repository.prisma';
import { GetAllPublications } from '../../usecases/publications/getAll-publications/get-all-publications.usecase';
import { UserRepositoryPrisma } from '../repositories/user.repository.prisma';
import { FavoriteRepositoryPrisma } from '../repositories/favorite.repository.prisma';

import { GetUserPublicationsDTO } from '../../usecases/users/getUserPublications/get-user-publications.dto';
import { GetUserPublications } from '../../usecases/users/getUserPublications/get-user-publications.usecase';


const publicationRepository = new PublicationRepositoryPrisma();
const userRepository=new UserRepositoryPrisma();
const favoriteRepository= new FavoriteRepositoryPrisma();

const getAllPublicationsUseCase = new GetAllPublications(publicationRepository, userRepository,favoriteRepository);

export const getAllPublicationsController = async (req: Request, res: Response) => {
    try {
        const userRole=res.locals.jwtPayload.userRole;
        const publications = await getAllPublicationsUseCase.execute(userRole);
        res.status(200).json(publications);
    } catch (error) {
        const typedError = error as Error;
        if (typedError.message === 'Unauthorized') {
            res.status(401).json({ message: 'Unauthorized access' });
        } else if (typedError.message === 'Forbidden') {
            res.status(403).json({ message: 'Forbidden access' });
        } else if (typedError.message === 'No publications found') {
            res.status(404).json({ message: 'No publications found' });
        } else {
            console.error('Error fetching publications:', typedError); // Optional logging
            res.status(500).json({ message: 'Error fetching publications', error: typedError.message });
        }
    }
};

export const getUserPublicationsController = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.jwtPayload.userId; 
        const dto: GetUserPublicationsDTO = { userId };
        const getUserPublicationsUseCase = new GetUserPublications(publicationRepository, userRepository, favoriteRepository);
        const publications = await getUserPublicationsUseCase.execute(dto);
        res.status(200).json(publications);
    } catch (error) {
        const typedError = error as Error;
        if (typedError.message === 'User not found') {
            res.status(404).json({ message: 'User not found' });
        } else if (typedError.message === 'No publications found') {
            res.status(404).json({ message: 'No publications found for this user' });
        } else {
            res.status(500).json({ message: 'Error retrieving user publications', error: typedError.message });
        }
    }
};






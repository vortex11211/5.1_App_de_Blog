import { Request, Response } from 'express';
import { PublicationRepositoryPrisma } from '../repositories/publication.repository.prisma';
import { GetAllPublications } from '../../usecases/publications/getAll-publications/get-all-publications.usecase';
import { UserRepositoryPrisma } from '../repositories/user.repository.prisma';
import { FavoriteRepositoryPrisma } from '../repositories/favorite.repository.prisma';

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
        res.status(500).json({ message: 'Error fetching publications', error: typedError.message });
    }
};


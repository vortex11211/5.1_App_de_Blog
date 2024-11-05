import { Request, Response } from 'express';
import { PublicationRepositoryPrisma } from '../../repositories/publication.repository.prisma';
import { GetAllPublications } from '../../../usecases/publications/getAll-publications/get-all-publications.usecase';


const publicationRepository = new PublicationRepositoryPrisma();
const getAllPublicationsUseCase = new GetAllPublications(publicationRepository);

export const getAllPublicationsController = async (req: Request, res: Response) => {
    try {
        const publications = await getAllPublicationsUseCase.execute();
        res.status(200).json(publications);
    } catch (error) {
        const typedError = error as Error;
        res.status(500).json({ message: 'Error fetching publications', error: typedError.message });
    }
};


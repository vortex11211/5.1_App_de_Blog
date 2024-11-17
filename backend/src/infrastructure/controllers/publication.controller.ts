import { Request, Response } from "express";
import { PublicationRepositoryPrisma } from "../repositories/publication.repository.prisma";

import { PostPublication } from "../../usecases/publications/post-publication/post-publication.usecase";
import { PostPublicationDTO } from "../../usecases/publications/post-publication/post-publication.dto";

import { EditPublicationDTO } from "../../usecases/publications/edit-publication/edit-publication.dto";
import { EditPublication } from "../../usecases/publications/edit-publication/edit-publication.usecase";

import { SoftDeletePublicationDTO } from "../../usecases/publications/softdeleted-publication/softdeleted-publication.dto";
import { SoftDeletePublication } from "../../usecases/publications/softdeleted-publication/softdeleted-publication.usecase";

import { DeletePublicationDTO } from "../../usecases/publications/delete-publication/delete-publication.dto";
import { DeletePublication } from "../../usecases/publications/delete-publication/delete-publication.usecase";

import { GetPublicationByIdDTO } from "../../usecases/publications/get-publication-by-id/get-publication-by-id.dto";
import { GetPublicationByIdUseCase } from "../../usecases/publications/get-publication-by-id/get-publication-by-id.usescase";

const publicationRepository = new PublicationRepositoryPrisma();

const postPublicationUseCase = new PostPublication(publicationRepository);

export const postPublicationController = async (req: Request, res: Response) => {
    try {
        const{title, content}= req.body;
        const authorId=res.locals.jwtPayload.userId;
        const dto: PostPublicationDTO = {title,content,authorId}
        const createdPublication = await postPublicationUseCase.execute(dto);
        res.status(201).json({ message: 'Post created successfully', publication: createdPublication })
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message })
    }
}

const editPublicationUseCase = new EditPublication(publicationRepository);

export const editPublicationController = async (req: Request, res: Response) => {
    try {
        const dto: EditPublicationDTO = req.body;
        const updatedPublication = await editPublicationUseCase.execute(dto);
        res.status(200).json({ message: 'Publication updated successfully', publication: updatedPublication });
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message });
    }
};

const softDeletePublicationUseCase = new SoftDeletePublication(publicationRepository);

export const softDeletePublicationController = async (req: Request, res: Response) => {
    try {
        const dto: SoftDeletePublicationDTO = req.body;
        const softdeletePublication = await softDeletePublicationUseCase.execute(dto);
        res.status(200).json({ message: `Publication ${softdeletePublication.deleted ? 'deleted' :'restored'} successfully`, publication: softdeletePublication })
    } catch (error) {
        const typedError = error as Error;
        res.status(400).json({ message: typedError.message })
    }

};

/*const deletePublicationUseCase = new DeletePublication(publicationRepository);
export const deletePublicationController = async (req: Request, res: Response) => {
    try {
        const dto: DeletePublicationDTO = req.body;
        await deletePublicationUseCase.execute(dto);
        res.sendStatus(200).json({ message: 'Publication deleted permanently successfully' })
    } catch (error) {
        const typedError = error as Error;
        if (!res.headersSent) { 
        res.status(400).json({ message: typedError.message });
    }
}

};*/
const deletePublicationUseCase = new DeletePublication(publicationRepository);

export const deletePublicationController = async (req: Request, res: Response) => {
  try {
    if (!res.locals.jwtPayload) {
      res.status(403).json({ message: 'Forbidden: Missing JWT payload' });
      return;
    }
    const { userId, userRole } = res.locals.jwtPayload;
    const dto: DeletePublicationDTO = req.body;
    await deletePublicationUseCase.execute(dto, userId, userRole);
    res.status(200).json({ message: 'Publication deleted permanently successfully' });
  } catch (error) {
    const typedError = error as Error;
    if (!res.headersSent) {
      res.status(400).json({ message: typedError.message });
    }
  }
};


export const getPublicationByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const publicationId = parseInt(id, 10);
        console.log('publicationId:', publicationId);

        if (isNaN(publicationId)) {
            res.status(400).json({ message: 'Invalid publication ID' });
            return;
        }
        
        const dto: GetPublicationByIdDTO = { publicationId };
        const getPublicationByIdUseCase = new GetPublicationByIdUseCase(publicationRepository);
        const publication = await getPublicationByIdUseCase.execute(dto);
        
        if (publication) {
            res.status(200).json(publication);
        } else {
            res.status(404).json({ message: 'Publication not found' });
        }
    } catch (error) {
        const typedError = error as Error;
        res.status(500).json({ message: 'Error al obtener la publicación', error: typedError.message });
    }
};



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

const deletePublicationUseCase = new DeletePublication(publicationRepository);
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

};



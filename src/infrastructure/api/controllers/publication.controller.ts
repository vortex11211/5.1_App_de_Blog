import { Request, Response } from "express";
import { PublicationRepositoryPrisma } from "../../repositories/publication.repository.prisma";

import { PostPublication } from "../../../usecases/post-publication/post-publication.usecase";
import { PostPublicationDTO } from "../../../usecases/post-publication/post-publication.dto";

import { EditPublicationDTO } from "../../../usecases/edit-publication/edit-publication.dto";
import { EditPublication } from "../../../usecases/edit-publication/edit-publication.usecase";


const publicationRepository= new PublicationRepositoryPrisma();

const postPublicationUseCase= new PostPublication(publicationRepository);

export const postPublicationController = async (req:Request, res: Response)=>{
    try{
    const dto: PostPublicationDTO= req.body;
    const createdPublication= await postPublicationUseCase.execute(dto);
    res.status(201).json({message: 'Post created succesfuly', publication:createdPublication})
}catch (error){
    const typedError= error as Error;
    res.status(400).json({message: typedError.message})
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

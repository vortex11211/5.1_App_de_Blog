import { PostPublication } from "../../../usecases/post-publication/post-publication.usecase";
import { Request, Response } from "express";
import { PublicationRepositoryPrisma } from "../../repositories/publication.repository.prisma";
import { PostPublicationDTO } from "../../../usecases/post-publication/post-publication.dto";

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


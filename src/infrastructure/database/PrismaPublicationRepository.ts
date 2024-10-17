import { PrismaClient } from "@prisma/client";
import { PublicationRepository } from "../repositories/publication.repository.prisma";
import { Publication } from "../../domain/entities/publication.entity";

const prisma = new PrismaClient();

export class PrismaPublicationRepository implements PublicationRepository{
    async findByAuthorId(authorId:number):Promise<Publication[]>{
        const publications=await prisma.publication.findMany({
            where:{authorId}});
return publications.map(publication => new Publication(publication.id, publication.title,publication.content,publication.authorId));

}
async save(publication:Publication):Promise<Publication>{
    const newPublication = await prisma.publication.create({
        data:{
        title: publication.title,
        content: publication.content,
        authorId: publication.authorId
        },
});
return new Publication(newPublication.id,newPublication.title,newPublication.content,newPublication.authorId)

}
}


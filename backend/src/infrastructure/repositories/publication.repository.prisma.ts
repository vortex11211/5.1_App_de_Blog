import { PublicationGateway } from "../../domain/gateways/publication.gateway";
import prisma from './prismaClient';
import { PublicationMapper } from "./publication.mapper";
import { Publication as DomainPublication } from '../../domain/entities/publication.entity';

export class PublicationRepositoryPrisma implements PublicationGateway {
    public async save(publication: DomainPublication): Promise<void> {
        const prismaPublication = {
            title: publication.title,
            content: publication.content,
            authorId: publication.authorId,
            createdAt: publication.createdAt,
            updatedAt: publication.updatedAt,
           
        };
        await prisma.publication.create({
            data: prismaPublication,
            select: {
                id: true,
                title: true,
                content: true,
                authorId: true,
                createdAt: true,
                updatedAt: true,
             
            }
        })
    }
    public async update(publication: DomainPublication): Promise<void> {
        const prismaPublication = PublicationMapper.toPersistence(publication);

        const existingPublication = await prisma.publication.findUnique({
            where: {id: prismaPublication.id},
            select:{deleted:true},
        });
        if(existingPublication?.deleted){
            throw new Error ('Cannot update a deleted publication')
        }
        await prisma.publication.update({
            where: { 
                id: prismaPublication.id, 
                deleted: false
            },
            data: prismaPublication,
        });
    }

public async softDelete(publication: DomainPublication): Promise<void> {
    const prismaPublication = PublicationMapper.toPersistence(publication);
    await prisma.publication.update({
        where:{id: prismaPublication.id},
        data:{deleted:prismaPublication.deleted, updatedAt: new Date()}
    });
}

public async delete(id: number, userId: number, userRole: string): Promise<void> {
    const publication = await prisma.publication.findUnique({
      where: { id },
    });

    if (!publication) {
      throw new Error('Publication not found');
    }
    if (userRole !== 'admin' && publication.authorId !== userId) {
      throw new Error('You do not have permission to delete this publication');
    }

    // Eliminar los "likes" relacionados
    await prisma.favorite.deleteMany({
      where: { publicationId: id },
    });

    await prisma.publication.delete({
      where: { id },
    });
  }


    public async findById(id: number): Promise<DomainPublication | null> {
      const publicationData = await prisma.publication.findUnique({ where: { id:Number(id) } });
        if (!publicationData) {
            return null;
        }
        return PublicationMapper.toDomain(publicationData);
    }

    public async list(): Promise<DomainPublication[]> {
        const publicationData = await prisma.publication.findMany();
        return publicationData.map(PublicationMapper.toDomain);
    }

    public async findByTitle(title: string): Promise<DomainPublication[] | null> {
        const publicationsData = await prisma.publication.findMany({
            where: { title: { contains: title } }
        });
        if (!publicationsData) {
            return null;
        }
        return publicationsData.map(publication => PublicationMapper.toDomain(publication));
    }

    public async findByUserIdWithDeleted(userId:number): Promise<DomainPublication[]>{
        const publicationData = await prisma.publication.findMany({
            where:{
                authorId:userId
            }
        });
        return publicationData.map(PublicationMapper.toDomain);
    }
}

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
            updatedAt: publication.updatedAt
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
        await prisma.publication.update({
            where: { id: prismaPublication.id },
            data: prismaPublication,
        });
    }


    public async findById(id: number): Promise<DomainPublication | null> {
        const publicationData = await prisma.publication.findUnique({ where: { id } });
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
}

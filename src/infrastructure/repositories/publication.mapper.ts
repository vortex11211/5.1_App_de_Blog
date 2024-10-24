import { Publication as DomainPublication } from "../../domain/entities/publication.entity";
import { Publication as PrismaPublication } from "@prisma/client"

export class PublicationMapper {
    static toPersistence(publication: DomainPublication): PrismaPublication {
        const prismaPublication = {
            id: publication.id,
            title: publication.title,
            content: publication.content,
            authorId: publication.authorId,
            createdAt: publication.createdAt,
            updatedAt: publication.updatedAt
        } as any;
        return prismaPublication
    }

    static toDomain(prismaPublication: PrismaPublication): DomainPublication {
        return DomainPublication.with({
            id: prismaPublication.id,
            title: prismaPublication.title,
            content: prismaPublication.content,
            authorId: prismaPublication.authorId,
            createdAt: prismaPublication.createdAt,
            updatedAt: prismaPublication.updatedAt

        });
    }

}
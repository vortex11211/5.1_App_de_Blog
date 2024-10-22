import {Like as DomainLike } from '../../domain/entities/like.entity';
import {Like as PrismaLike} from '@prisma/client';

export class LikeMapper{
    static toPersistence(like:DomainLike):PrismaLike{
        return{
            id:like.id,
userId:like.userId,
publicationId:like.publicationId,
createdAt: like.createdAt
        }
    };

    static toDomain(prismaLike: PrismaLike):DomainLike{
        return DomainLike.with({
            id:prismaLike.id,
            userId:prismaLike.userId,
            publicationId:prismaLike.publicationId,
            createdAt:prismaLike.createdAt
        })
    }
}
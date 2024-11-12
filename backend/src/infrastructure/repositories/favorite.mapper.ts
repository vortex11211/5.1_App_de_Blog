import { Favorite as DomainFavorite } from '../../domain/entities/favorite.entity';
import { Favorite as PrismaFavorite } from '@prisma/client';

export class FavoriteMapper {
    static toPersistence(favorite: DomainFavorite): Omit<PrismaFavorite, 'id'> {
        return {
            userId: favorite.userId,
            publicationId: favorite.publicationId,
            createdAt: favorite.createdAt
        };
    }

    static toDomain(prismaFavorite: PrismaFavorite): DomainFavorite {
        return DomainFavorite.with({
            id: prismaFavorite.id,
            userId: prismaFavorite.userId,
            publicationId: prismaFavorite.publicationId,
            createdAt: prismaFavorite.createdAt
        });
    }
}



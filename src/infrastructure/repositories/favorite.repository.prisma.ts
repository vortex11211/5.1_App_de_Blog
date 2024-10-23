/*import prisma from './prismaClient';
import { Favorite as DomainFavorite } from '../../domain/entities/favorite.entity';
import { FavoriteGateway } from '../../domain/gateways/favorite.gateway';
import { FavoriteMapper } from './favorite.mapper';

export class FavoriteRepositoryPrisma implements FavoriteGateway {
    public async save(favorite: DomainFavorite): Promise<void> {
        const prismaFavorite = FavoriteMapper.toPersistence(favorite);
        console.log('Prisma favorite before create:', prismaFavorite);

        try {
            const result = await prisma.favorite.create({
                data: prismaFavorite,
                select: {
                    id: true,
                    userId: true,
                    publicationId: true,
                    createdAt: true
                }
            });
            console.log('Prisma favorite created:', result);
        } catch (error) {
            console.error('Error creating prisma favorite:', error);
            throw error;
        }
    }

    public async findByUserAndPublication(userId: number, publicationId: number): Promise<DomainFavorite | null> {
        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_publicationId: {
                    userId,
                    publicationId
                }
            }
        });

        if (!favorite) {
            return null;
        }

        return FavoriteMapper.toDomain(favorite);
    }

    public async deleteByUserAndPublication(userId: number, publicationId: number): Promise<void> {
        console.log(`Deleting favorite for userId: ${userId} and publicationId: ${publicationId}`);
        await prisma.favorite.deleteMany({
            where: {
                userId,
                publicationId
            }
        });
    }
}
*/

import prisma from './prismaClient';
import { Favorite as DomainFavorite } from '../../domain/entities/favorite.entity';
import { FavoriteGateway } from '../../domain/gateways/favorite.gateway';
import { FavoriteMapper } from './favorite.mapper';

export class FavoriteRepositoryPrisma implements FavoriteGateway {
    public async save(favorite: DomainFavorite): Promise<void> {
        const prismaFavorite = FavoriteMapper.toPersistence(favorite);
        console.log('Prisma favorite before create:', prismaFavorite);

        try {
            const result = await prisma.favorite.create({
                data: prismaFavorite,
                select: {
                    id: true,
                    userId: true,
                    publicationId: true,
                    createdAt: true
                }
            });
            console.log('Prisma favorite created:', result);
        } catch (error) {
            console.error('Error creating prisma favorite:', error);
            throw error;
        }
    }

    public async findByUserAndPublication(userId: number, publicationId: number): Promise<DomainFavorite | null> {
        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_publicationId: {
                    userId,
                    publicationId
                }
            }
        });

        if (!favorite) {
            return null;
        }

        return FavoriteMapper.toDomain(favorite);
    }

    public async deleteByUserAndPublication(userId: number, publicationId: number): Promise<void> {
        console.log(`Deleting favorite for userId: ${userId} and publicationId: ${publicationId}`);
        await prisma.favorite.deleteMany({
            where: {
                userId,
                publicationId
            }
        });
    }
}

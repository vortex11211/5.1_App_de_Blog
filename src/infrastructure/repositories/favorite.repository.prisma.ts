import prisma from './prismaClient';
import { Favorite as DomainFavorite } from '../../domain/entities/favorite.entity';
import { FavoriteGateway } from '../../domain/gateways/favorite.gateway';
import { FavoriteMapper } from './favorite.mapper';

export class FavoriteRepositoryPrisma implements FavoriteGateway {
    public async save(favorite: DomainFavorite): Promise<void> {
        const prismaFavorite = FavoriteMapper.toPersistence(favorite); 
        const publicationExists = await prisma.publication.findUnique({
            where: { id: prismaFavorite.publicationId }
        });
        if (!publicationExists) {
            throw new Error('PublicationNotFound'); 
        } try {
            await prisma.favorite.create({
                 data: prismaFavorite 
                });
        } catch (unknownError) {
            const error = unknownError as Error
            throw new Error(`Failed to save favorite: ${error.message}`);
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

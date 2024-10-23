import { FavoriteGateway } from "../../domain/gateways/favorite.gateway";
import prisma from './prismaClient';
import { Favorite as DomainFavorite} from "../../domain/entities/favorite.entity";
import { FavoriteMapper } from "./favorite.mapper";


export class FavoriteRepositoryPrisma implements FavoriteGateway {
    public async save(favorite: DomainFavorite): Promise<void> {
        const prismaFavorite=FavoriteMapper.toPersistence(favorite);
        await prisma.favorite.create({
            data: prismaFavorite
        });
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
            return null
        }
        return FavoriteMapper.toDomain(favorite)
        };
    

    public async deleteByUserAndPublication(userId: number, publicationId: number): Promise<void> {
        await prisma.favorite.deleteMany({
            where: {
                userId,
                publicationId
            }
        });
    }
}
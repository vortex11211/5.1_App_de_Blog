import { LikeGateway } from "../../domain/gateways/like.gateway";
import prisma from './prismaClient';
import { Like } from "../../domain/entities/like.entity";
import { LikeMapper } from "./like.mapper";


export class LikeRepositoryPrisma implements LikeGateway {
    public async save(like: Like): Promise<void> {
        const prismaLike=LikeMapper.toPersistence(like);
        await prisma.like.create({
            data: prismaLike
        });
    }

    public async findByUserAndPublication(userId: number, publicationId: number): Promise<Like | null> {
        const like = await prisma.like.findUnique({
            where: {
                userId_publicationId: {
                    userId,
                    publicationId
                }
            }
        });

        if (!like) {
            return null
        }
        return LikeMapper.toDomain(like)
        };
    

    public async deleteByUserAndPublication(userId: number, publicationId: number): Promise<void> {
        await prisma.like.deleteMany({
            where: {
                userId,
                publicationId
            }
        });
    }
}
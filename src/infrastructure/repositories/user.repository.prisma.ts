import { UserGateway } from "../../domain/gateways/user.gateway";
import prisma from "./prismaClient";
import { UserMapper } from "./user.mapper";
import { User as DomainUser } from "../../domain/entities/user.entity";

export class UserRepositoryPrisma implements UserGateway {
    public async save(user: DomainUser): Promise<void> {
        /*   const prismaUser = UserMapper.toPersistence(user);*/
        const prismaUser = {
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role, 
            banned: user.banned,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        console.log('Creating user with data:', prismaUser);

        /*await prisma.user.create({ data: prismaUser
         });*/
        await prisma.user.create({
            data: prismaUser,
            select: {
                id: true,
                username: true,
                email: true,
                password: true,
                role: true,
                banned: true,
                createdAt: true,
                updatedAt: true
            }
        });

    }

    public async findById(id: number): Promise<DomainUser | null> {
        const userData = await prisma.user.findUnique({ where: { id } });
        if (!userData) {
            return null;
        }
        return UserMapper.toDomain(userData);
    }

    public async list(): Promise<DomainUser[]> {
        const usersData = await prisma.user.findMany();
        return usersData.map(UserMapper.toDomain);
    }

    public async findByEmail(email: string): Promise<DomainUser | null> {
        const userData = await prisma.user.findUnique({ where: { email } });
        if (!userData) {
            return null;
        }
        return UserMapper.toDomain(userData);
    }
}

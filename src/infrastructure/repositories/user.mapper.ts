import { Role as PrismaRole, User as PrismaUser } from "@prisma/client";
import { User as DomainUser, UserProps, Role as DomainRole } from "../../domain/entities/user.entity";

type Role = PrismaRole | DomainRole;

export class UserMapper {
    static toPersistence(user: DomainUser): PrismaUser {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            role: user.role as PrismaRole,
            banned: user.banned,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    static toDomain(prismaUser: PrismaUser): DomainUser {
        return DomainUser.with({
            id: prismaUser.id,
            username: prismaUser.username,
            email: prismaUser.email,
            password: prismaUser.password,
            role: prismaUser.role as DomainRole,  
            banned: prismaUser.banned,
            createdAt: prismaUser.createdAt,
            updatedAt: prismaUser.updatedAt
        });
    }
}

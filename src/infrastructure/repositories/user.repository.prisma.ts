import { User } from "../../domain/entities/user.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
import prisma from "./prismaClient"


export class UserRepositoryPrisma implements UserGateway {
    public async save(user: User): Promise<void> {
      await prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          password:user.password,
          role: user.role.SIMPLE_USER
        }
      });
    }
  
    public async findById(id: number): Promise<User | null> {
      const userData = await prisma.user.findUnique({
        where: { id },
      });
  
      if (!userData) {
        return null;
      }
  
      return User.with({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        banned: userData.banned,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
    });
  
    public async list(): Promise<User[]> {
      const usersData = await prisma.user.findMany();
      return usersData.map(userData => 
        User.with({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role
        })
      );
    }
  }
}
import { PrismaClient } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository.prisma'; 
import { User } from '../../domain/entities/user.entity';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new User(user.id, user.username, user.email, user.password);
  }

  async save(user: User): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        username:user.username,
        email: user.email,
        password: user.password
      }
    });
    return new User(newUser.id, newUser.username,newUser.email, newUser.password);
  }
}

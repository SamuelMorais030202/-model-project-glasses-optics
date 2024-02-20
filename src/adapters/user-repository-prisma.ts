import { prisma } from '../lib/prisma';
import { IUser, IUserCreate, IUserRepository } from '../core/user';

export class PrismaUserRepository implements IUserRepository {
  async addUser(user: IUserCreate): Promise<IUser> {
    const result = await prisma.user.create({
      data: user,
    });

    return result;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
} 
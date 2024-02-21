import { prisma } from '../lib/prisma';
import { IUser, IUserCreate, IUserRepository } from '../core/user';

export class PrismaUserRepository implements IUserRepository {
  async addUser(user: IUserCreate): Promise<IUser> {
    const result = await prisma.user.create({
      data: user,
    });

    return result;
  }

  async findUserAll(): Promise<IUser[]> {
    return await prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    return user;
  }

  async findUserByCpf(cpf: string): Promise<IUser | null> {
    return await prisma.user.findUnique({ where: { cpf } });
  }

  async update(user: IUser): Promise<IUser> {
    const {id, ...sendData} = user;
    const update = await prisma.user.update({
      where: { id },
      data: sendData
    });
    return update;
  }

  async deleteUserById(id: string): Promise<IUser> {
    const deletedUser = await prisma.user.delete({ where: { id } });
    return deletedUser
  }
} 
import { IGlasses, IGlassesCreate, IGlassesRepository } from "../core/glasses";
import { prisma } from "../lib/prisma";

export class PrismaGlasseRepository implements IGlassesRepository {
  async create(glasse: IGlassesCreate): Promise<IGlasses> {
    return await prisma.glasses.create({ data: glasse });
  }

  async getGlassesAll(): Promise<IGlasses[]> {
    return await prisma.glasses.findMany();
  }

  async getGlassesById(id: number): Promise<IGlasses | null> {
    return await prisma.glasses.findUnique({ where: { id } });
  }

  async getGlasseByModel(model: string): Promise<IGlasses[] | null> {
    return await prisma.glasses.findMany({ where: { model } });
  }

  async deleteGlasseById(id: number): Promise<IGlasses> {
    return await prisma.glasses.delete({ where: { id } });
  }

  async updateGlasse(glasse: IGlasses): Promise<IGlasses> {
    const { id, ...sendData } = glasse;
    return await prisma.glasses.update({
      where: { id },
      data: sendData,
    });
  }
}
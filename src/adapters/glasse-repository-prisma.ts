import { IGlasses, IGlassesCreate, IGlassesRepository } from "../core/glasses";
import { prisma } from "../lib/prisma";

export class PrismaGlasseRepository implements IGlassesRepository {
  async create(glasse: IGlassesCreate): Promise<IGlasses> {
    return await prisma.glasses.create({ data: glasse });
  }
}
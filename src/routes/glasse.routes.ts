import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaGlasseRepository } from "../adapters/glasse-repository-prisma";
import { GlasseService } from "../core/glasses";
import { GlasseController } from "../interfaces/glasse-controller";

export default async function glasseRoutes(fastify: FastifyInstance): Promise<void> {
  const glasseRepository = new PrismaGlasseRepository();
  const glasseService = new GlasseService(glasseRepository);
  const glasseController = new GlasseController(glasseService);

  //@ts-ignore
  fastify.post(
    '/glasse',
    (req: FastifyRequest, reply: FastifyReply) => glasseController.createGlasse(req, reply),
  );
}
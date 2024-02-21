import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaGlasseRepository } from "../adapters/glasse-repository-prisma";
import { GlasseService } from "../core/glasses";
import { GlasseController } from "../interfaces/glasse-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

export default async function glasseRoutes(fastify: FastifyInstance): Promise<void> {
  const glasseRepository = new PrismaGlasseRepository();
  const glasseService = new GlasseService(glasseRepository);
  const glasseController = new GlasseController(glasseService);

  //@ts-ignore
  fastify.addHook('preHandler', authMiddleware);

  //@ts-ignore
  fastify.post(
    '/glasse',
    (req: FastifyRequest, reply: FastifyReply) => glasseController.createGlasse(req, reply),
  );

  //@ts-ignore
  fastify.get(
    '/glasse/model',
    (req: FastifyRequest, reply: FastifyReply) => glasseController.findGlassesByModel(req, reply),
  );

  //@ts-ignore
  fastify.get(
    '/glasse',
    (req: FastifyRequest, reply: FastifyReply) => glasseController.findGlassesAll(req, reply),
  );

  //@ts-ignore
  fastify.get(
    '/glasse/:id',
    (req: FastifyRequest, reply: FastifyReply) => glasseController.findGlasseById(req, reply),
  );

  //@ts-ignore
  fastify.delete(
    '/glasse/:id',
    (req: FastifyRequest, reply: FastifyReply) => glasseController.deleteGlasse(req, reply),
  );

  //@ts-ignore
  fastify.put(
    '/glasse/:id',
    (req: FastifyRequest, reply: FastifyReply) => glasseController.updateGlasse(req, reply),
  );
}
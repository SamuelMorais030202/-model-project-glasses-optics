import { FastifyReply, FastifyRequest } from "fastify";
import { GlasseService, IGlassesCreate } from "../core/glasses";

export class GlasseController {
  constructor(
    private glasseService: GlasseService,
  ) { }

  async createGlasse(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const glasse = req.body as IGlassesCreate;
    try {
      const newGlasse = await this.glasseService.create(glasse);
      reply.status(201).send(newGlasse);
    } catch (error) {
      reply.send(error);
    }
  }
}
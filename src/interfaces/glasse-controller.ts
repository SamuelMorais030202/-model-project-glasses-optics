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

  async findGlassesAll(_req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const glasses = await this.glasseService.getGlassesAll();
    reply.send(glasses)
  }

  async findGlasseById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as { id: string };
    try {
      const glasse = await this.glasseService.getGlassesById(Number(id));
      return reply.send(glasse);
    } catch (error) {
      reply.status(404).send(error);
    }
  }

  async findGlassesByModel(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const model = req.body as IGlassesCreate['model'];
    try {
      const glasse = await this.glasseService.getGlasseByModel(model);
      return reply.send(glasse);
    } catch (error) {
      reply.status(404).send(error);
    } 
  }

  async deleteGlasse(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as { id: string };
    try {
      const deleteGlasse = await this.glasseService.deleteGlasseById(Number(id));
      return reply.send(deleteGlasse);
    } catch (error) {
      reply.status(404).send(error);
    } 
  }

  async updateGlasse(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as { id: string };
    const glasse = req.body as IGlassesCreate;
    try {
      const updateGlasse = await this.glasseService.updateGlasse({ id: Number(id), ...glasse });
      return reply.send(updateGlasse);
    } catch (error) {
      reply.status(404).send(error);
    } 
  }
}
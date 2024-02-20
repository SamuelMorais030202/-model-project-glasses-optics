import { FastifyRequest, FastifyReply } from "fastify";
import { JwtAuthService } from "../adapters/autj-service-jwt";

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  const authService = new JwtAuthService();

  const authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    reply.status(401).send({ error: 'Token não fornecido' });
    return;
  }

  const token = authorizationHeader.replace('Bearer ', '');

  try {
    const user = authService.verifyToken(token);
    //@ts-ignore
    req.user = user;
    return;
  } catch (error) {
    reply.status(401).send({ error: 'Token inválido' });
    return;
  }
}
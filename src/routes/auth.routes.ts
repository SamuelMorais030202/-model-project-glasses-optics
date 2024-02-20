import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { PrismaUserRepository } from "../adapters/user-repository-prisma";
import { JwtAuthService } from "../adapters/autj-service-jwt";
import { UserService } from "../core/user";
import { AuthController } from "../interfaces/auth-controller";

export default async function authRoutes(fastify: FastifyInstance): Promise<void> {
  const userRepository = new PrismaUserRepository();
  const authService = new JwtAuthService();
  const userService = new UserService(userRepository, authService);
  const authController = new AuthController(userService);

  //@ts-ignore
  fastify.post('/login', (req: FastifyRe, reply: FastifyReply) => authController.login(req, reply));
}

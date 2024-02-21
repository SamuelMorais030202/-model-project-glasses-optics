import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { JwtAuthService } from "../adapters/autj-service-jwt";
import { PrismaUserRepository } from "../adapters/user-repository-prisma";
import { UserService } from "../core/user";
import { UserController } from "../interfaces/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

export default async function userRoutes(fastify: FastifyInstance): Promise<void> {
  const userRepository = new PrismaUserRepository();
  const authService = new JwtAuthService()
  const userService = new UserService(userRepository, authService);
  const userController = new UserController(userService);
  
  //@ts-ignore
  fastify.post(
    '/user',
    (req: FastifyRequest, reply: FastifyReply) => userController.addUser(req, reply),
  );

  //@ts-ignore
  fastify.get(
    '/user',
    {onRequest: [authMiddleware]},
    (req: FastifyRequest, reply: FastifyReply) => userController.findUserAll(req, reply),
  );

  //@ts-ignore
  fastify.get(
    '/user/:id',
    {onRequest: [authMiddleware]},
    (req: FastifyRequest, reply: FastifyReply) => userController.getUserById(req, reply),
  );

  //@ts-ignore
  fastify.put(
    '/user/:id',
    {onRequest: [authMiddleware]},
    (req: FastifyRequest, reply: FastifyReply) => userController.updateUser(req, reply),
  );

  //@ts-ignore
  fastify.delete(
    '/user/:id',
    {onRequest: [authMiddleware]},
    (req: FastifyRequest, reply: FastifyReply) => userController.deletedUserById(req, reply),
  );
} 

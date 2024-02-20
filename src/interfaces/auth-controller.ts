import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../core/user";

export class AuthController {
  constructor(private userService: UserService) {}

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = request.body as { email: string, password: string};

    try {
      const token = await this.userService.loginUser(email, password);
      reply.send({ token });
    } catch (error) {
      console.error(error);
      reply.status(401).send({ error: 'Credenciais inválidas' });
    }
  }
}
import { FastifyRequest, FastifyReply } from "fastify";
import { IUserCreate, IUserRepository, UserService } from "../core/user";

export class UserController {
  constructor (
    private userService: UserService,
  ) {
  }

  async addUser(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { address, age, city, cpf, email, lastName, name, password } = request.body as IUserCreate;

    const veriyUserExists = await this.userService.findUserByEmail(email);
    if (veriyUserExists) {
      throw new Error('User already exists');
    }

    try {
      const response = await this.userService.addUser({
        address,
        age,
        city,
        cpf,
        email,
        lastName,
        name,
        password
      });
      reply.send(response);
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: 'Internal Server Error' + error })
    }
  }

  async getUserById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as { id: string };

    try {
      const getUser = await this.userService.findUserById(id);
      reply.send(getUser)
    } catch (error: any) {
      reply.send(error);
    }
  }

  async deletedUserById(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = req.params as { id: string };
    try {
      const deletedUser = await this.userService.deleteUserById(id);
      return reply.send(deletedUser);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
}
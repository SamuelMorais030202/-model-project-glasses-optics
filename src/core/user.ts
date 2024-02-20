export interface IUser {
  id: string;
  name: string;
  lastName: string;
  age: number;
  address: string;
  city: string;
  email: string;
  cpf: string;
  password: string;
}

export interface IUserCreate {
  name: string;
  lastName: string;
  age: number;
  address: string;
  city: string;
  email: string;
  cpf: string;
  password: string;
}

export interface IUserRepository {
  addUser(user: IUserCreate): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser | null> 
}

export interface IAuthService {
  generateToken(user: IUser): string;
  verifyToken(token: string): IUser | string;
}

export class UserService {
  constructor (
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) { };

  async addUser(user: IUserCreate): Promise<IUser> {
    const newUser = await this.userRepository.addUser(user);

    return newUser;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await this.userRepository.findUserByEmail(email);

    if(user === null) return null;

    return user;
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    if (password !== user.password) {
      throw new Error('Credenciais inválidas')
    }

    const token = this.authService.generateToken(user);
    return token;
  }
}
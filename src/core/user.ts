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
  findUserByEmail(email: string): Promise<IUser | null> ;
  findUserById(id: string): Promise<IUser | null>;
  deleteUserById(id: string): Promise<IUser>
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

  async findUserByEmail(email: string): Promise<IUser | string> {
    const user = await this.userRepository.findUserByEmail(email);

    if(user === null) {
      throw new Error('User not existing');
    }

    return user;
  }

  
  async findUserById(id: string): Promise<IUser | string> {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new Error('User not existing')
    }

    return user;
  }

  async deleteUserById(id: string): Promise<IUser | string> {
    const veriyUserExists = await this.userRepository.findUserById(id);
    if(veriyUserExists === null) {
      throw new Error('Usuário não existe')
    }

    const deletedUser = await this.userRepository.deleteUserById(id);
    return deletedUser
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
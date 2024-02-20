import jwt from 'jsonwebtoken';
import { IUser, IAuthService } from '../core/user';

const secretKey = 'your-secret-key';

export class JwtAuthService implements IAuthService {
  generateToken(user: IUser): string {
    return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '26h' })
  }

  verifyToken(token: string): IUser | string {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded as IUser;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
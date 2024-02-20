import { app } from '../server';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import glasseRoutes from './glasse.routes';

export default async function routes() {
  authRoutes(app);
  userRoutes(app);
  glasseRoutes(app);
}
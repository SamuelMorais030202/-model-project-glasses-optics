import { app } from '../server';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

export default async function routes() {
  userRoutes(app);
  authRoutes(app)
}
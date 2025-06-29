import express, { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { userRoutes } from './modules/users/user.routes';
import { playlistRoutes } from './modules/playlists/playlist.routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());

app.use('/', userRoutes);
app.use('/playlists', playlistRoutes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message });
  }

  console.error(err);
  return response.status(500).json({ status: 'error', message: 'Internal server error' });
});

export { app };
import express, { Request, Response, NextFunction } from 'express';
import { Liquid } from 'liquidjs';
import path from 'path';
import 'dotenv/config';
import { userRoutes } from './modules/users/user.routes';
import { playlistRoutes } from './modules/playlists/playlist.routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(express.json());

const engine = new Liquid({
    root: path.join(__dirname, '../views'),
    extname: '.template'
});

app.engine('template', engine.express()); 
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'template');

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({ message: 'API is running!' });
});

app.use('/users', userRoutes);
app.use('/playlists', playlistRoutes);

app.get('/teste', (req, res) => {
    const dadosParaView = {
        tituloDaPagina: "Página de Teste Dinâmica",
        nomeDoUsuario: "Leonardo",
        horaAtual: new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    };
    res.render('teste', dadosParaView);
});

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message });
  }

  console.error(err);
  return response.status(500).json({ status: 'error', message: 'Internal server error' });
});

export { app };
import { Request, Response, NextFunction } from "express"; // Importe o NextFunction
import { PlaylistService } from "./playlist.service";
import { PlaylistRepository } from "./playlist.repository";

export class PlaylistController {
    private playlistService: PlaylistService;

    constructor() {
        const playlistRepository = new PlaylistRepository();
        this.playlistService = new PlaylistService(playlistRepository);
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const playlist = await this.playlistService.create(req.body, req.user.id);
            return res.status(201).json(playlist);
        } catch (error) {
            return next(error);
        }
    }

    findMyPlaylists = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const playlists = await this.playlistService.findMyPlaylists(req.user.id);
            return res.status(200).json(playlists);
        } catch (error) {
            return next(error);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const playlist = await this.playlistService.findById(id, req.user.id);
            return res.status(200).json(playlist);
        } catch (error) {
            return next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const updatedPlaylist = await this.playlistService.update(id, req.user.id, req.body);
            return res.status(200).json(updatedPlaylist);
        } catch (error) {
            return next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.playlistService.delete(id, req.user.id);
            return res.status(200).json({ message: "Playlist excluída com sucesso" });
        } catch (error) {
            return next(error);
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { PlaylistService } from "./playlist.service";
import { PlaylistRepository } from "./playlist.repository";
import { UserService } from "../users/user.service";
import { UserRepository } from "../users/user.repository";

export class PlaylistController {
    private playlistService: PlaylistService;
    private userService: UserService; 

    constructor() {
        const playlistRepository = new PlaylistRepository();
        this.playlistService = new PlaylistService(playlistRepository);

        const userRepository = new UserRepository();
        this.userService = new UserService(userRepository);
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const playlist = await this.playlistService.create(req.body, userId);
            return res.status(201).json(playlist);
        } catch (error) {
            return next(error);
        }
    }

    findMyPlaylists = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const playlists = await this.playlistService.findMyPlaylists(userId);
            const user = await this.userService.findById(userId);
            return res.render('playlists', { playlists: playlists, user: user });
        } catch (error) {
            return next(error);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const { id } = req.params;
            const playlist = await this.playlistService.findById(id, userId);
            return res.status(200).json(playlist);
        } catch (error) {
            return next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const { id } = req.params;
            const updatedPlaylist = await this.playlistService.update(id, userId, req.body);
            return res.status(200).json(updatedPlaylist);
        } catch (error) {
            return next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const { id } = req.params;
            await this.playlistService.delete(id, userId);
            return res.status(200).json({ message: "Playlist excluída com sucesso" });
        } catch (error) {
            return next(error);
        }
    }
}
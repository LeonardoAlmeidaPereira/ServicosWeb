import { Request, Response } from "express";
import { PlaylistService } from "./playlist.service";
import { PlaylistRepository } from "./playlist.repository";

export class PlaylistController {
    private playlistService: PlaylistService;

    constructor() {
        const playlistRepository = new PlaylistRepository();
        this.playlistService = new PlaylistService(playlistRepository);
    }
    async create(req: Request, res: Response) {
        const playlist = await this.playlistService.create(req.body, req.user.id);
        return res.status(201).json(playlist);
    }

    async findMyPlaylists(req: Request, res: Response) {
        const playlists = await this.playlistService.findMyPlaylists(req.user.id);
        return res.status(200).json(playlists);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const playlist = await this.playlistService.findById(id, req.user.id);
        return res.status(200).json(playlist);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedPlaylist = await this.playlistService.update(id, req.user.id, req.body);
        return res.status(200).json(updatedPlaylist);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        await this.playlistService.delete(id, req.user.id);
        return res.status(204).send();
    }
}
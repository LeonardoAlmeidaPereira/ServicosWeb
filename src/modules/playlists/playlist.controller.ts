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

    renderCreatePage = (req: Request, res: Response) => {
        return res.render("create-playlist");
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        const playlistData = req.body;
        try {
            await this.playlistService.create(playlistData, userId);
            return res.redirect("/playlists");
        } catch (error) {
            return res.render("create-playlist", { error });
        }
    }

    register = async (req: Request, res: Response) => {
        try {
            await this.userService.register(req.body);
            return res.redirect("/users/login");
        } catch (error) {
            return res.render("register", { error });
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
            return res.render('playlist-details', { playlist: playlist });
        } catch (error) {
            return next(error);
        }
    }

    renderEditPage = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const { id } = req.params;
            const playlist = await this.playlistService.findById(id, userId);
            return res.render('edit-playlist', { playlist: playlist });
        } catch (error) {
            return next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const { id } = req.params;
            const updatedPlaylist = await this.playlistService.update(id, userId, req.body);
            return res.redirect(`/playlists/${id}`);
        } catch (error) {
            return res.render('edit-playlist', { playlist: updatedPlaylist });
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.session.userId!; 
        try {
            const { id } = req.params;
            await this.playlistService.delete(id, userId);
            return res.redirect('/playlists');
        } catch (error) {
            return next(error);
        }
    }
}
import { PlaylistRepository } from "./playlist.repository";
import { AppError } from "../../shared/errors/AppError";
import { CreatePlaylistInput } from "./playlist.schema";
import { Playlist } from "@prisma/client";

export class PlaylistService {

    constructor(private repository: PlaylistRepository) {}

    async create(data: CreatePlaylistInput, userId: string): Promise<Playlist> {
        const playlist = await this.repository.create(data, userId);
        return playlist;
    }

    async findMyPlaylists(userId: string): Promise<Playlist[]> {
        const playlists = await this.repository.findAllByUserId(userId);
        return playlists;
    }

    async findById(playlistId: string, userId: string): Promise<Playlist> {
        const playlist = await this.repository.findById(playlistId);

        if (!playlist) {
            throw new AppError("Playlist não encontrada", 404);
        }

        if (playlist.userId !== userId) {
            throw new AppError("Acesso não autorizado", 403);
        }

        return playlist;
    }

    async update(playlistId: string, userId: string, data: Partial<CreatePlaylistInput>): Promise<Playlist> {
        await this.findById(playlistId, userId);
        return this.repository.update(playlistId, data);
    }

    async delete(playlistId: string, userId: string): Promise<void> {
        await this.findById(playlistId, userId);

        await this.repository.delete(playlistId);
    }
}
import { prisma } from "../../lib/prisma";
import { Playlist } from "@prisma/client";
import { CreatePlaylistInput } from "./playlist.schema";

export class PlaylistRepository {
    async create(data: CreatePlaylistInput, userId: string): Promise<Playlist> {
        return prisma.playlist.create({ data: { ...data, userId } });
    }

    async findAllByUserId(userId: string): Promise<Playlist[]> {
        return prisma.playlist.findMany({ where: { userId } });
    }

    async findById(id: string): Promise<Playlist | null> {
        return prisma.playlist.findUnique({ where: { id } });
    }

    async update(id: string, data: Partial<CreatePlaylistInput>): Promise<Playlist> {
        return prisma.playlist.update({ where: { id }, data: data });
    }

    async delete(id: string): Promise<Playlist> {
        return prisma.playlist.delete({ where: { id } });
    }
}
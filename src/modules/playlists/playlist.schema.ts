import {z} from "zod";

export const createPlaylistSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Nome da playlist é obrigatório"
        }).min(3, 'Nome deve ter pelo menos 3 caracteres'),

        description:z.string().optional(),
    }),
});

export const playlistIdParamSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "ID da playlist é obrigatório"
        }).uuid("ID da playlist inválido"),
    }),
});

export const updatePlaylistSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').optional(),
        description:z.string().optional(),
    }),
    params: z.object({
        id: z.string().uuid("ID da playlist inválido"),
    }),
})

export type CreatePlaylistInput = z.infer<typeof createPlaylistSchema>['body'];
export type UpdatePlaylistInput = z.infer<typeof updatePlaylistSchema>['body'];
export type PlaylistIdParam = z.infer<typeof playlistIdParamSchema>['params'];
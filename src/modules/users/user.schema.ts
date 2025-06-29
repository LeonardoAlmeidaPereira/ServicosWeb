import {z} from "zod";

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Nome é obrigatório"
        }).min(3, 'Nome deve ter pelo menos 3 caracteres'),
        email: z.string({
            required_error: "Email é obrigatório"
        }).email("Email inválido"),
        password: z.string({
            required_error: "Senha é obrigatória"
        }).min(6, 'Senha deve ter pelo menos 6 caracteres'),
    }),
});

export const loginUserSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email é obrigatório"
        }).email("Email inválido"),
        password: z.string({
            required_error: "Senha é obrigatória"
        }),
    }),
});

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').optional(),
        role: z.enum(['USER', 'ADMIN'],{
            errorMap: () => ({ message: "Role deve ser 'USER' ou 'ADMIN'." })
        }).optional(),
    }),

    params: z.object({
        id: z.string().uuid("ID inválido"),
    }),
})

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type LoginUserInput = z.infer<typeof loginUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];
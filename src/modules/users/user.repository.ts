import { prisma } from "../../lib/prisma";
import { CreateUserInput, UpdateUserInput } from "./user.schema";
import { User } from "@prisma/client";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async create(data: CreateUserInput & { passwordHash: string }): Promise<User> {
        const { name, email, passwordHash } = data;
        return prisma.user.create({ data: { name, email, password: passwordHash } });
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async update(id: string, data: UpdateUserInput): Promise<Omit<User, 'password'>> {
        const user = await prisma.user.update({ where: { id }, data: data });

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }


}

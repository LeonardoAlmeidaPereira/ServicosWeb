import { UserRepository } from "./user.repository";
import { CreateUserInput, LoginUserInput, UpdateUserInput } from "./user.schema";
import { AppError } from "../../shared/errors/AppError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
    constructor(private userRepository: UserRepository) { }

    async register(data: CreateUserInput) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError("Email já cadastrado", 409);
        }

        const passwordHash = await bcrypt.hash(data.password, 8);

        const user = await this.userRepository.create({ ...data, passwordHash });

        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword;
    }

    async login(data: LoginUserInput) {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError("Email ou senha inválidos", 401);
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

        if (!isPasswordCorrect) {
            throw new AppError("Email ou senha inválidos", 401);
        }

        const token = jwt.sign({ id: user.id, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        const { password, ...userWithoutPassword } = user;

        return ({
            user: userWithoutPassword,
            token
        })
    }

    async findAll() {
        return this.userRepository.findAll();
    }

    async update(id: string, data: UpdateUserInput) {
        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new AppError('Usuário não encontrado.', 404);
        }

        const updatedUser = await this.userRepository.update(id, data);

        return updatedUser;
    }
}
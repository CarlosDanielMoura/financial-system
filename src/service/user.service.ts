import { prisma } from '../database/prisma-client';
import { PasswordHash } from '../utils/PasswordHash';
import type { IUser, IUserCreate, IUserService, IUserWithoutPassword } from './../interface/user.interface';

class UserServicePrisma implements IUserService {
	async create(data: IUserCreate): Promise<IUserWithoutPassword> {
		const { password } = data;
		const hashPassword = await PasswordHash(password);
		const userCreated = (await prisma.user.create({
			data: {
				...data,
				password: hashPassword,
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				password: false,
				createdAt: true,
				updatedAt: true,
			},
		})) as IUserWithoutPassword;
		return userCreated;
	}

	async findAll(): Promise<IUserWithoutPassword[] | null> {
		const usersExists = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				password: false,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (usersExists.length === 0) {
			return null;
		}

		return usersExists || null;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const userAlreadyExists = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		return userAlreadyExists || null;
	}
}

export { UserServicePrisma };

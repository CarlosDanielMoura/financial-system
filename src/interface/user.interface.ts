import type { User as UserPrisma, UserRole } from '@prisma/client';

export interface IUserCreate {
	name: string;
	email: string;
	password: string;
	role: UserRole;
}

export interface IUser extends UserPrisma {
	id: number;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}

export interface IUserWithoutPassword extends Omit<IUser, 'password'> {}

export interface IUserService {
	create(data: IUserCreate): Promise<IUserWithoutPassword>;
	findByEmail(email: string): Promise<IUser | null>;
}

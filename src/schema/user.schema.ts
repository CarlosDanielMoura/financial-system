import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const UserCreateSchema = z.object({
	name: z.string().min(3, 'Nome deve ser no minímo 3 caracteres').max(255, 'Nome deve ser no máximo 255 caracteres'),
	email: z.string().email('E-mail deve ser válido'),
	password: z
		.string()
		.min(6, 'Senha deve ter no minímo 6 caracteres')
		.max(255, 'Senha deve ter no minímo 255 caracteres'),
	role: z.nativeEnum(UserRole),
});

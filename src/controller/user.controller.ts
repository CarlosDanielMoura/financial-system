import type { Request, Response } from 'express';
import type { IUserCreate, IUserService } from '../interface/user.interface';
import { UserCreateSchema } from '../schema/user.schema';

import HttpResponse from '../utils/HttpResponse';
import { BadRequestError, NotFoundError } from '../utils/helpers/api-errors';

class UserController {
	private readonly userService: IUserService;

	constructor(userService: IUserService) {
		this.userService = userService;
	}

	async create(req: Request, res: Response): Promise<void> {
		const data: IUserCreate = req.body;
		const parseResult = UserCreateSchema.safeParse(data);

		if (!parseResult.success) {
			const errorMessage = parseResult.error.errors
				.map((error) => `${error.path.join('.')}: ${error.message}`)
				.join(',');

			throw new BadRequestError(errorMessage);
		}

		const { email } = parseResult.data;

		const userAlreadyExists = await this.userService.findByEmail(email);

		if (userAlreadyExists) {
			throw new BadRequestError('E-mail já cadastrado.');
		}

		const user = await this.userService.create(parseResult.data);
		res.status(201).send(HttpResponse(201, 'Usuário criado com sucesso.', user));
	}

	async findAll(_req: Request, res: Response): Promise<void> {
		const users = await this.userService.findAll();
		if (!users) {
			throw new NotFoundError('Nenhum usuário encontrado.');
		}
		res.status(200).send(HttpResponse(200, 'Lista de usuários.', users));
	}
}

export { UserController };

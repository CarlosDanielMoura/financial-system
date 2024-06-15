import type { NextFunction, Request, Response } from 'express';
import HttpResponse from '../utils/HttpResponse';
import type { ApiError } from '../utils/helpers/api-errors';

const errorMiddleware = (error: Error & Partial<ApiError>, _req: Request, res: Response) => {
	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : 'Internal Server Error';

	res.status(statusCode).json(HttpResponse(statusCode, message));
};

export { errorMiddleware };

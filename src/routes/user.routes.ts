import express from 'express';
import type { Request, Response } from 'express';
import { UserController } from '../controller/user.controller';
import { UserServicePrisma } from '../service/user.service';

const userRouter = express.Router();
const userController = new UserController(new UserServicePrisma());

userRouter.post('/', (req: Request, res: Response) => userController.create(req, res));

export { userRouter };

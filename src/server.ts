import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/error';
import { userRouter } from './routes/user.routes';

const app = express();
app.use(express.json());
app.use('/users', userRouter);
app.use(errorMiddleware);

export default app;

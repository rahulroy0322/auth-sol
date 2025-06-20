import cookieParser from 'cookie-parser';
import cors from 'cors';
import exress, { type Express } from 'express';

import { errorMiddleware } from './middlewares/error.middleware';
import { notFoundMiddleware } from './middlewares/notFound.middleware';
import { apiRouter } from './routes';

const app: Express = exress();

app.use(exress.json());
app.use(cors());
app.use(cookieParser());

app.disable('x-powered-by');
app.disable('etag');

app.use('/api/v1', apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

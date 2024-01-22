import express from 'express';
import globalErrorHandler from './middlewares/global-error-handler';
import searchRouter from './routes/auth-route';
import limiter from './middlewares/rate-limiter';

const app = express();
app.use(express.json());
app.use(limiter);
app.use(searchRouter);
app.use(globalErrorHandler);

export default app;

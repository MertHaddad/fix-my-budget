import express, {  Request, Response } from 'express';
import logger from './config/logger';
import dotenv from 'dotenv';
import globalErrorHandler from './middlewares/global-error-handler';
import searchRouter from './routes/auth-route';

dotenv.config();
const app = express();
const port = process.env.PORT || 8181;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(searchRouter);

app.use(globalErrorHandler);
app.listen(port, () => {
  logger.info(
    `Starting Fix My Budget Server on port ${port} ${new Date().toLocaleString()}`
  );
});
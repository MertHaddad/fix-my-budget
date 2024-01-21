import { NextFunction,Request,Response } from 'express';
import logger from '../config/logger';

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  res.status(500).send('Internal Server Error');
};

export default globalErrorHandler;

import { log } from 'console';
import { Response, Request, NextFunction } from 'express';
import { z, AnyZodObject } from 'zod';
import logger from '../config/logger';

export default function validate(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (err: any) {
      logger.error(err);
      return res.status(400).send(err);
    }
  };
}

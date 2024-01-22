import { Router, Request, Response } from 'express';
import asyncHandler from '../utils/async-error-handler';
import { User } from '../models/user-model';
import { loginSchema } from '../schemas/user-schema';
import validate from '../middlewares/user-schema-validation';

const userRoute = Router();

userRoute.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

userRoute.get(
  '/users',
  asyncHandler(async (req: Request, res: Response) => {
    const fetchResult = await User.findAll();
    res.status(200).json(fetchResult);
  })
);

userRoute.post(
  '/user',
  validate(loginSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  })
);

export default userRoute;

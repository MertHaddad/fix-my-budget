import { Router, Request, Response } from 'express';
import asyncHandler from '../utils/async-error-handler';
import { User } from '../models/user-model';
import { loginSchema, signupSchema } from '../schemas/user-schema';
import validate from '../middlewares/user-schema-validation';
import {
  signInController,
  signUpController,
} from '../controllers/auth-controller';
import { errorLookup } from '../utils/error-lookup';

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
  validate(signupSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const signupRes = await signUpController(req);
    if (signupRes.error) {
      const error = errorLookup[signupRes.error];
      return res.status(error.code).json({ message: error.message });
    }

    res
      .cookie('jwt-token', signupRes.token, { httpOnly: true })
      .status(200)
      .json({ message: 'Login successful' });
  })
);

userRoute.post(
  '/login',
  validate(loginSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const signinRes = await signInController(req);
    if (signinRes.error) {
      const error = errorLookup[signinRes.error];
      return res.status(error.code).json({ message: error.message });
    }

    res
      .cookie('jwt-token', signinRes.token, { httpOnly: true })
      .status(200)
      .json({ message: 'Login successful' });
  })
);

export default userRoute;

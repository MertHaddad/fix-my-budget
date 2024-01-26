import { Router, Request, Response } from 'express';
import asyncHandler from '../utils/async-error-handler';
import { User } from '../models/user-model';
import {
  loginSchema,
  signupSchema,
  updateSchema,
} from '../schemas/user-schema';
import validate from '../middlewares/user-schema-validation';
import {
  signInController,
  signUpController,
  updatePasswordController,
} from '../controllers/auth-controller';
import { errorLookup } from '../utils/error-lookup';

const userRoute = Router();
userRoute.get(
  '/health',
  asyncHandler(async (req: Request, res: Response) => {
    res.status(200).send('you service is healthy!');
  })
);

userRoute.get(
  '/users',
  asyncHandler(async (req: Request, res: Response) => {
    const fetchResult = await User.findAll();
    res.status(200).json(fetchResult);
  })
);

userRoute.post(
  '/signup',
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

userRoute.post(
  '/update/:id',
  validate(updateSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const updateRes = await updatePasswordController(req);
    if (updateRes.error) {
      const error = errorLookup[updateRes.error];
      return res.status(error.code).json({ message: error.message });
    }

    res.status(200).json({ message: 'Updated successful' });
  })
);

export default userRoute;

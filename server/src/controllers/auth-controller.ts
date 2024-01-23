import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model';
import { loginSchema, signupSchema } from '../schemas/user-schema';
import { z } from 'zod';
import logger from '../config/logger';
import { errorType } from '../utils/error-lookup';

export type signinBody = z.infer<typeof loginSchema>;
export type signupBody = z.infer<typeof signupSchema>;
export interface signinResponse {
  error?: errorType;
  token?: string;
  message?: string;
}

const signInController = async (req: signinBody): Promise<signinResponse> => {
  const { email, password } = req.body;

  const user = await User.findOne(email as any);
  if (!user) {
    return { error: 'notFoundError' };
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: 'invalidPasswordError' };
  }

  const token = jwt.sign(
    { id: user.id },
    process?.env?.JWT_SECRET || 'secret',
    {
      expiresIn: '1h',
    }
  );

  return { token: token };
};

const signUpController = async (req: signupBody): Promise<signinResponse> => {
  const { email, password } = req.body;

  const user = await User.findOne(email as any );
  if (user) {
    return { error: 'userExistsError' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword } as any);

  const token = jwt.sign(
    { id: newUser.id },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '1h' }
  );

  return { token : token };
};

// const refreshController = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(400).json({ message: 'Refresh token is required' });
//   }

//   const decoded = jwt.verify(
//     refreshToken,
//     process.env.JWT_SECRET || 'secret'
//   ) as { id: string };

//   const user = await User.findById(decoded.id);

//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
//     expiresIn: '1h',
//   });

//   return res.status(200).json({ token });
// };

// const updateUserController = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: 'User not found' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.findByIdAndUpdate(user._id, { password: hashedPassword });

//   return res.status(200).json({ message: 'User updated' });
// };

export {
  signInController,
  signUpController,
  //   refreshController,
  //   updateUserController,
};

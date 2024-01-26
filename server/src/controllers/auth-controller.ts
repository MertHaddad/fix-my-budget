import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model';
import {
  genericResponseInterface,
  signinBodyType,
  signupBodyType,
  updateBodyType,
} from '../types/userTypes';

const signInController = async (
  req: signinBodyType
): Promise<genericResponseInterface> => {
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

const signUpController = async (
  req: signupBodyType
): Promise<genericResponseInterface> => {
  const { email, password } = req.body;

  const user = await User.findOne(email as any);
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

  return { token: token };
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

const updatePasswordController = async (
  req: updateBodyType
): Promise<genericResponseInterface> => {
  const { id } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ where: { id: id } });

  if (!user) {
    return { error: 'notFoundError' };
  }

  const hashedPassword = await bcrypt.hash(password as any, 10);
  await User.update({ password: hashedPassword }, { where: { id: user.id } });
  return { message: 'Password updated' };
};

export {
  signInController,
  signUpController,
  //   refreshController,
  updatePasswordController,
};

// import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { User } from '../models/user';


// const signInController = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid password' });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || 'secret',
//       { expiresIn: '1h' }
//     );

//     return res.status(200).json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// const signUpController = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({ email, password: hashedPassword });

//     const token = jwt.sign(
//       { id: newUser._id },
//       process.env.JWT_SECRET || 'secret',
//       { expiresIn: '1h' }
//     );

//     return res.status(201).json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// const refreshController = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(400).json({ message: 'Refresh token is required' });
//   }

//   try {
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.JWT_SECRET || 'secret'
//     ) as { id: string };

//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || 'secret',
//       { expiresIn: '1h' }
//     );

//     return res.status(200).json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// const updateUserController = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }
    
//     try {
//         const user = await User.findOne({ email });
    
//         if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//         }
    
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    
//         return res.status(200).json({ message: 'User updated' });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
//     };


// export { signInController, signUpController, refreshController, updateUserController };

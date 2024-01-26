import { z } from 'zod';

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
});

const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  }),
});

const passwordResetSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const passwordUpdateSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(100),
  }),
  params: z.object({
    id: z.string(),
  }),
});

const updateSchema = z.object({
  body: z
    .object({
      name: z.string().min(2).max(100).optional(),
      email: z.string().email().optional(),
      password: z.string().min(6).max(100).optional(),
    })
    .refine((value) => {
      return Object.values(value).some((field) => field !== undefined);
    }, 'At least one of the fields (name, email, password) should be present'),
  params: z.object({
    id: z.string().optional(),
  }),
});

export {
  loginSchema,
  signupSchema,
  passwordResetSchema,
  passwordUpdateSchema,
  updateSchema,
};

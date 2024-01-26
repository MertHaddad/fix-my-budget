import { z } from "zod";
import { loginSchema, signupSchema, updateSchema } from "../schemas/user-schema";
import { errorType } from "../utils/error-lookup";

export type signinBodyType = z.infer<typeof loginSchema>;
export type signupBodyType = z.infer<typeof signupSchema>;
export type updateBodyType = z.infer<typeof updateSchema>;
export interface genericResponseInterface {
  error?: errorType;
  token?: string;
  message?: string;
}
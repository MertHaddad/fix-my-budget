interface ErrorLookup {
  readonly [key: string]: { code: number; message: string };
}

export const errorLookup: ErrorLookup = {
  notFoundError: { code: 404, message: 'User not found' },
  invalidPasswordError: { code: 401, message: 'Invalid password' },
  ValidationError: { code: 400, message: 'Email and password are required' },
  UniqueConstraintError: { code: 409, message: 'User already exists' },
  defaultError: { code: 500, message: 'Internal server error' },
  userExistsError: { code: 409, message: 'User already exists' },
};

const errorsArray = [
    'notFoundError',
    'invalidPasswordError',
    'ValidationError',
    'UniqueConstraintError',
    'defaultError',
    "userExistsError",
  ] as const;

export type errorType = (typeof errorsArray)[number];
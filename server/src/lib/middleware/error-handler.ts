import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../util/custom-error';

export const ErrorHandler = (
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    const { errors, statusCode, stack, message, validationError } = err;
    if (err.logging) {
      // eslint-disable-next-line no-console
      console.error(
        JSON.stringify(
          {
            code: statusCode,
            errors: errors,
            stack: stack,
          },
          null,
          2,
        ),
      );
    }
    if (validationError) return res.status(400).json({ validationError });
    return res.status(statusCode).send({ message });
  }
  // eslint-disable-next-line no-console
  console.log('error', err);
  return res.status(500).send({ erros: [{ message: err }] });
};

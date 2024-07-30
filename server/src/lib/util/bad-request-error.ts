import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  private readonly _validationError: ValidationError[] | undefined;
  private static readonly _statusCode: number = 400;
  private readonly _logging: boolean;
  private readonly _code: number;

  constructor(params: {
    message?: string;
    code?: number;
    logging?: boolean;
    validatorError?: ValidationError[];
  }) {
    const { logging, message, code, validatorError } = params;
    super(message || 'Bad Request');
    this._code = code || BadRequestError._statusCode;
    this._logging = logging || false;
    this._validationError = validatorError;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  get errors() {
    return [{ message: this.message }];
  }

  get statusCode() {
    return this._code;
  }
  get logging() {
    return this._logging;
  }
  get validationError() {
    return this._validationError;
  }
}

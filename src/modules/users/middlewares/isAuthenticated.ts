import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT toker is missing');
  }
  //bearer dsadadadlskadihdih43248hahdsadhasda
  const [, token] = authHeader.split(' ');
  const { secret } = authConfig.jwt;
  try {
    const decodeToken = verify(token, secret);

    return next();
  } catch {
    throw new AppError('Invalid Token is missing');
  }
}

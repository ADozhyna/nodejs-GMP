import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from '../utils/logger';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const message = 'User not found';
  winstonLogger .error(`Request: ${req?.method} ${req?.url}; params: ${JSON.stringify(req?.params)}; query: ${JSON.stringify(req?.query)}; request body: ${JSON.stringify(req?.body)}; error: ${message}`);
  res.status(404).send(message);
};
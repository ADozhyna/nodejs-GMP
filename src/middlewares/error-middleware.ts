import HttpException from '../common/http-exception';
import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from '../utils/logger';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.statusCode || error.status || 500;
  winstonLogger.error(`Request: ${req?.method} ${req?.url}; params: ${JSON.stringify(req?.params)}; query: ${JSON.stringify(req?.query)}; request body: ${JSON.stringify(req?.body)}; error: ${error.message}`);
  res.status(status).send(error);
};
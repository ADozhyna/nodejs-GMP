import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from '../utils/logger'

export const logger = (req: Request, res: Response, next: NextFunction) => {
    winstonLogger.info(`Request: ${req?.method} ${req?.url}; params: ${JSON.stringify(req?.params)}; query: ${JSON.stringify(req?.query)}; request body: ${JSON.stringify(req?.body)}`);
    next();
}

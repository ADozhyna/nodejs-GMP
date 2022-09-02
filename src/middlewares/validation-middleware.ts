import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { winstonLogger } from '../utils/logger';
import { errorResponse } from '../validation/error-mapping';

export const validateSchema = (schema: Joi.AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    }) ;

    if (error?.isJoi) {
      console.log(error.details);
       winstonLogger.info(`Request: ${req?.method} ${req?.url}; request body: ${JSON.stringify(req?.body)}; error: validation error`);
       return res.status(400).json(errorResponse(error.details))
    }

    next();
  }
}
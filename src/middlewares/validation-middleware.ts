import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { errorResponse } from '../validation/error-mapping';

export const validateSchema = (schema: Joi.AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    }) ;

    if (error?.isJoi) {
       return res.status(400).json(errorResponse(error.details))
    }

    next();
  }
}
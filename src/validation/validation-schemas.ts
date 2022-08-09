import * as Joi from 'joi';

export const postSchema: Joi.AnySchema = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().regex(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/).required(),
  age: Joi.number().min(4).max(130).required()
});

export const loginSchema: Joi.AnySchema = Joi.object().keys({
  login: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().regex(/^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/).required()
});
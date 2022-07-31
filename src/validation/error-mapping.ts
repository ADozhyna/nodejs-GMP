import Joi from 'joi';

export const errorResponse = (schemaErrors: Array<Joi.ValidationErrorItem>) => {
  const errors = schemaErrors.map((err) => {
    let { path, message } = err;
    return { path, message };
  });
  return {
    status: 'failed',
    errors
  }
}
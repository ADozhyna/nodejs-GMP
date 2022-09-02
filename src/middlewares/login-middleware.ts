import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import HttpException from '../common/http-exception';
import { User } from '../db/models/user.model';
config();

export const loginMiddleware = (
  req: express.Request<{}, {}, {}, {}>,
  res: express.Response,
  next: express.NextFunction,
) => {
    let authToken = req.headers['x-access-token'] as string;

    if (!authToken) {
      const err = new HttpException('Unauthorized access denied', 401);
      next(err);
      return
    }

    jwt.verify(authToken, process.env.TOKEN_KEY as string, (err) => {
      if (err) {
        const error = new HttpException('Invalid token', 403, err.name)
        next(error);
      } else {
        const currentUser = jwt.decode(authToken) as User;
        (res as any).currentUser = { id: currentUser.id, login: currentUser.login, age: currentUser.age };
        next();
      }        
    });
};

import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const loginMiddleware = (
  req: express.Request<{}, {}, {}, {}>,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    let authToken = req.headers["x-access-token"] as string;

    if (!authToken) {
      res.status(401).send('Unauthorized access denied');
    }

    jwt.verify(authToken, process.env.TOKEN_KEY as string, (err) => {
      if (err) {
        res.status(403).send('Invalid token');
      } 
        
      return next();

    });
  } catch (e) {
    next(e);
  }
};

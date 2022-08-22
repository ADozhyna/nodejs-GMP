import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const tokenGenerationMiddleware = (
    req: express.Request<{}, {}, {}, {}>,
    res: express.Response,
    next: express.NextFunction,
  ) => {

    const token = jwt.sign((res as any).currentUser, process.env.TOKEN_KEY as string, { expiresIn: "2h" });
    const finalPayload = {
      result: (res as any).payload,
      sessionToken: token
    };
    res.status(200).json(finalPayload);
  };
  
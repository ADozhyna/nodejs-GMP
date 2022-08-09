import express, { Request, Response, NextFunction } from 'express';
import { validateSchema } from '../middlewares/validation-middleware';
import { LoginService } from '../services/login.service';
import { loginSchema } from '../validation/validation-schemas';

const service = new LoginService();
export const loginRouter = express.Router();

loginRouter.post('/', validateSchema(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body;
    const token =  await service.loginUser(login, password);
    res.status(200).json({ token });
  } catch(e) {
    next(e)
  }
});
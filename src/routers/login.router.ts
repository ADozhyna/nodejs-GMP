import express, { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../data-access/user.memory.repository';
import { validateSchema } from '../middlewares/validation-middleware';
import { LoginService } from '../services/login.service';
import { loginSchema } from '../validation/validation-schemas';

const service = new LoginService(new UserRepository());
export const loginRouter = express.Router();

loginRouter.post('/', validateSchema(loginSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body;
    const currentUser =  await service.loginUser(login, password);
    (res as any).currentUser = { id: currentUser.id, login: currentUser.login, age: currentUser.age };
    (res as any).payload = {};
    next();
  } catch(e) {
    next(e)
  }
});
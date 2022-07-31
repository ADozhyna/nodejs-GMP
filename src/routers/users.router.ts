import express, { Request, Response, NextFunction } from 'express';
import { validateSchema } from '../middlewares/validation-middleware';
import { postSchema } from "../validation/validation-schemas";
import { UserAttributes } from '../db/models/user.model';
import { UserService } from '../services/user.service';
import { UserRepository } from '../data-access/user.memory.repository';

const service = new UserService(new UserRepository());

export const usersRouter = express.Router();

// GET All users
usersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users =  await service.getAll();
    res.status(200).send(users);
  } catch(e) {
    next(e)
  }
});

// GET users/searchByLogin
usersRouter.get('/searchByLogin', async (req: Request<{}, {}, {}, { query: string; limit: number }>, res: Response, next: NextFunction) => {
  try {
    const { query, limit } = req.query;
    const users = await service.searchUserByLogin(query, limit);
    res.status(200).send(users);
  } catch(e) {
    next(e);
  }
});

// GET users/:id
usersRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.getUserById(+req.params.id);
    res.status(200).send(user);
  } catch(e) {
    next(e);
  }
});

//POST create new user
usersRouter.post('/', validateSchema(postSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserAttributes = { ...req.body, isDeleted: false };
    const newUserId = await service.createUser(user);
    res.status(200).json({ id: newUserId });
  } catch(e) {
    next(e);
  }
});

// PUT users/:id
usersRouter.put('/:id', validateSchema(postSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userUpdate: UserAttributes = req.body;
    const updatedUser = await service.updateUser(+req.params.id, userUpdate);
    return res.status(200).json(updatedUser);
  } catch(e) {
    next(e);
  }
});

// DELETE users/:id
usersRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedUserId = await service.deleteUser(+req.params.id);
    return res.status(200).send({ id: deletedUserId });
  } catch(e) {
    next(e);
  }
});

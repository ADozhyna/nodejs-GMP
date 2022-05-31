import express, { Request, Response } from 'express';
import { validateSchema } from '../middleware/validation-middleware';
import { postSchema } from "../validation/validation-schemas";
import { User } from './user.model';
import * as userService from './user.service';

export const usersRouter = express.Router();

// GET All users

usersRouter.get('/', (req: Request, res: Response) => {
  const users = userService.getAll();
  res.status(200).send(users);
});

// GET users/searchByLogin

usersRouter.get('/searchByLogin', (req: Request<{}, {}, {}, { query: string; limit: number }>, res: Response) => {
  const { query, limit } = req.query;
  if (query && limit) {
    const users = userService.searchUserByLogin(query, +limit)
    return res.status(200).send(users);
  }

  res.status(400).send('Bad request');
});

// GET users/:id

usersRouter.get('/:id', (req: Request, res: Response) => {
  const user = userService.getuserById(req.params.id);
  
  if (user) {
    return res.status(200).send(user);
  }
  
  res.status(404).send('User not found');
});

//POST create new user

usersRouter.post('/', validateSchema(postSchema), (req: Request, res: Response) => {
  const user: User = req.body;
  const newUserId = userService.createUser(user);
  res.status(200).json({ userId: newUserId });
});

// PUT users/:id

usersRouter.put('/:id', validateSchema(postSchema), (req: Request, res: Response) => {
  const userUpdate: User = req.body;
  const updatedUser = userService.updateUser(req.params.id, userUpdate);
  if (updatedUser) {
    return res.status(200).json(updatedUser);
  }
  
  res.status(404).send('User not found');
});

// DELETE users/:id

usersRouter.delete('/:id', (req: Request, res: Response) => {
  const deletedUser = userService.deleteUser(req.params.id);
  if (deletedUser) {
    return res.status(204).send('User has been deleted');
  }

  res.status(404).send('User not found');
});


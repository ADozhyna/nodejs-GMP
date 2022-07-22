import express, { Request, Response, NextFunction } from 'express';
import { UserGroupService } from '../services/user-group.service';

const service = new UserGroupService();

export const userGroupsRouter = express.Router();

//POST add user to group
userGroupsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.userId;
    const groupId = req.body.groupId;
    const group = service.addUserToGroup(userId, groupId)
    res.status(200).json(group);
  } catch(e) {
    next(e);
  }
});
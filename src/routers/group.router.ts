import express, { Request, Response, NextFunction } from 'express';
import { GroupRepository } from '../data-access/group.memory.repository';
import { GroupAttributes } from '../db/models/group.model';
import { GroupService } from '../services/group.service';

const service = new GroupService(new GroupRepository());

export const groupsRouter = express.Router();

// GET All groups
groupsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groups =  await service.getAll();
    res.status(200).send(groups);
  } catch(e) {
    next(e)
  }
});

// GET groups/:id
groupsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const group = await service.getGroupById(+req.params.id);
    res.status(200).send(group);
  } catch(e) {
    next(e);
  }
});

//POST create new group
groupsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const group: GroupAttributes = req.body;
    const newGroupId = await service.createGroup(group);
    res.status(200).json({ id: newGroupId });
  } catch(e) {
    next(e);
  }
});

// PUT group/:id
groupsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupUpdate: GroupAttributes = req.body;
    const updatedGroup = await service.updateGroup(+req.params.id, groupUpdate);
    return res.status(200).json(updatedGroup);
  } catch(e) {
    next(e);
  }
});

// DELETE group/:id
groupsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedGroupId = await service.deleteGroup(+req.params.id);
    return res.status(200).send({ id: deletedGroupId });
  } catch(e) {
    next(e);
  }
});

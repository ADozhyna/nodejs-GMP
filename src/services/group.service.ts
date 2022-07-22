import { GroupAttributes } from '../db/models/group.model';
import * as GroupRepo from '../data-access/group.memory.repository';
import HttpException from '../common/http-exception';

export class GroupService {
  public getAll() {
    return GroupRepo.getAll();
  }

  public async getGroupById(id: number) {
    const group = await GroupRepo.getById(id);
    if (group) {
      return group;
    } else {
      throw new HttpException(404, 'Group not found');
    }
  }

  public async deleteGroup(id: number) {
    const deletedGroupId = await GroupRepo.deleteOne(id);
    if (deletedGroupId) {
        return deletedGroupId;
    } else {
        throw new HttpException(404, 'Group not found');
    }
  }

  public createGroup(group: GroupAttributes) {
    return GroupRepo.createOne(group);
  }

  public async updateGroup(id: number, group: GroupAttributes
    ) {
    const [,[updatedGroup]] = await GroupRepo.updateOne(id, group);
    if (updatedGroup) {
        return updatedGroup;
    } else {
        throw new HttpException(404, 'Group not found');
    }
  }
}

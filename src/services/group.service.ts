import { GroupAttributes } from '../db/models/group.model';
import  { GroupRepository } from '../data-access/group.memory.repository';
import HttpException from '../common/http-exception';

export class GroupService {

  private groupRepository: GroupRepository;

  constructor(groupRepo: GroupRepository) {
    this.groupRepository = groupRepo;
  }

  public getAll() {
    return this.groupRepository.getAll();
  }

  public async getGroupById(id: number) {
    const group = await this.groupRepository.getById(id);
    if (group) {
      return group;
    } else {
      throw new HttpException(404, 'Group not found');
    }
  }

  public async deleteGroup(id: number) {
    const deletedGroupId = await this.groupRepository.deleteOne(id);
    if (deletedGroupId) {
        return deletedGroupId;
    } else {
        throw new HttpException(404, 'Group not found');
    }
  }

  public createGroup(group: GroupAttributes) {
    return this.groupRepository.createOne(group);
  }

  public async updateGroup(id: number, group: GroupAttributes
    ) {
    const [,[updatedGroup]] = await this.groupRepository.updateOne(id, group);
    if (updatedGroup) {
        return updatedGroup;
    } else {
        throw new HttpException(404, 'Group not found');
    }
  }
}

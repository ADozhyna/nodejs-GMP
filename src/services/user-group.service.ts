import { UserGroupRepository } from '../data-access/user-group.memory.repository';

export class UserGroupService {
    private userGroupRepository: UserGroupRepository
    
    constructor(userGroupRepo: UserGroupRepository) {
        this.userGroupRepository = userGroupRepo;
    }

    public addUserToGroup(UserId: number, GroupId: number) {
        return this.userGroupRepository.createUserGroup(UserId, GroupId);
    }
}
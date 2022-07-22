import * as UserGroupRepo from '../data-access/user-group.memory.repository';

export class UserGroupService {
    public addUserToGroup(UserId: number, GroupId: number) {
        return UserGroupRepo.createUserGroup(UserId, GroupId);
    }
}
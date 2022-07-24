import { UserGroup } from "../db/models/group-permissions.model";

export class UserGroupRepository {
    public async createUserGroup(UserId: number, GroupId: number) {
        return UserGroup.create({ UserId, GroupId }, { returning: true });
    };
}


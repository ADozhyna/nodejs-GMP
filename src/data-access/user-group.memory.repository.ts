import { UserGroup } from "../db/models/group-permissions.model";

export const createUserGroup = async (UserId: number, GroupId: number) => {
    return UserGroup.create({ UserId, GroupId }, { returning: true });
};
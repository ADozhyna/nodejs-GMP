import { GroupAttributes, Group } from '../db/models/group.model';

export const getAll = async () => {
    return await Group.findAll();
};

export const getById = async (id: number) => { 
    return await Group.findByPk(id);
};

export const createOne = async (group: GroupAttributes) => {
    return Group.create({ name: group.name, permissions: group.permissions }, { returning: true });
};

export const updateOne = async (id: number, group: GroupAttributes) => {
    return Group.update(group, {
        where: {
          id
        },
        returning: true
    });
};

export const deleteOne = async (id: number) => {
    return Group.destroy({
        where: {
            id
        }
    });
};

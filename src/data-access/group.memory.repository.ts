import { GroupAttributes, Group } from '../db/models/group.model';

export class GroupRepository {
    public async getAll() {
        return await Group.findAll();
    };
    
    public async getById(id: number) { 
        return await Group.findByPk(id);
    };
    
    public async createOne(group: GroupAttributes) {
        return Group.create({ name: group.name, permissions: group.permissions }, { returning: true });
    };
    
    public async updateOne(id: number, group: GroupAttributes) {
        return Group.update(group, {
            where: {
              id
            },
            returning: true
        });
    };
    
    public async deleteOne (id: number) {
        return Group.destroy({
            where: {
                id
            }
        });
    };
      
}


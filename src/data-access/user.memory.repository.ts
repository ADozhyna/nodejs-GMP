import { UserAttributes, User } from '../db/models/user.model';
import { Op } from 'sequelize';

export class UserRepository {
    public async getAll() {
        return await User.findAll();
    };
    
    public async getById(id: number) {
        return await User.findByPk(id);
    };
    
    public async createOne(user: UserAttributes) {
        return User.create({ login: user.login, password: user.password, age: user.age, isDeleted: user.isDeleted }, { returning: true });
    };
    
    public async updateOne(id: number, user: UserAttributes) {
        return User.update(user, {
            where: {
              id
            },
            returning: true
        });
    };
    
    public async deleteOne(id: number) {
        return User.update({ isDeleted: true }, {
            where: {
              id
            },
            returning: true
        });
    };
    
    public async searchByLogin(loginSubstring: string, limit: number = 3) {
        return User.findAll({
            where: {
              login: {
                [Op.iLike]: `%${loginSubstring}%`
              }
            },
            order: ['login'],
            limit
        });
    };
}


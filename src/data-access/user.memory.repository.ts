import { UserAttributes, User } from '../db/models/user.model';
import { Op } from 'sequelize';

export const getAll = async () => {
    return await User.findAll();
};

export const getById = async (id: number) => {
    console.log(User.findByPk(id)) 
    return await User.findByPk(id);
};

export const createOne = async (user: UserAttributes) => {
    return User.create({ login: user.login, password: user.password, age: user.age, isDeleted: user.isDeleted }, { returning: true });
};

export const updateOne = async (id: number, user: UserAttributes) => {
    return User.update(user, {
        where: {
          id
        },
        returning: true
    });
};

export const deleteOne = async (id: number) => {
    return User.update({ isDeleted: true }, {
        where: {
          id
        },
        returning: true
    });
};

export const searchByLogin = async (loginSubstring: string, limit: number = 3) => {
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
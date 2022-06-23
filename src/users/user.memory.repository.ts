import { query } from '../database/db';
import { User } from './user.model';

export const getAll = async (): Promise<Array<User>> => {
    const users = await query(
      'SELECT * FROM Users WHERE isDeleted=false'
    );
    return users;
};

export const getById = async (id: string) => {
    const [user] = await query(
        'SELECT id, login, age FROM Users WHERE id=$1 AND isDeleted=false LIMIT 1',
        [id]
    )
    return user;
};

export const createOne = async (user: User) => {
    const [id] = await query(
        'INSERT INTO Users (login, password, age, isdeleted) VALUES ($1, $2, $3, false) RETURNING id;',
        [user.login, user.password, user.age]
    );
    return id;
};

export const updateOne = async (id: string, user: User) => {
    const [updatedUser] = await query(
        'UPDATE Users SET login=$2, password=$3, age=$4 WHERE id=$1 RETURNING id, login, age;',
        [id, user.login, user.password, user.age]
    );

    return updatedUser;
};

export const deleteOne = async (id: string) => {
    const [deletedUserId] = await query(
        'UPDATE Users SET isDeleted=true WHERE id=$1 RETURNING id;',
        [id]
    );

    return deletedUserId;
};

export const searchByLogin = async (loginSubstring: string, limit: number = 3) => {
    const users = await query(
        'SELECT id, login, age FROM Users WHERE login ILIKE $1 LIMIT $2;',
        [`%${loginSubstring}%`, limit]
    );

    return users.sort((a, b) => a['login'].localeCompare(b['login']));
};
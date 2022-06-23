import { User } from './user.model';
import * as UserRepo from './user.memory.repository';

export const getAll = () => UserRepo.getAll();
export const getuserById = (id: string) => UserRepo.getById(id);
export const createUser = (user: User) => UserRepo.createOne(user);
export const updateUser = (id: string, user: User) => UserRepo.updateOne(id, user);
export const deleteUser = (id: string) => UserRepo.deleteOne(id);
export const searchUserByLogin = (loginSubstring: string, limit: number = 3) => UserRepo.searchByLogin(loginSubstring, limit);
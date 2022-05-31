import { users } from '../mock-data/mock-users';
import { User } from './user.model';

export const getAll = (): Array<User> => users.filter(user => !user.isDeleted);
export const getuserById = (id: string) => users.find(user => user.id === id && !user.isDeleted);
export const createUser = (user: User) => {
  const newUser = new User(user.login, user.password, user.age)
  users.push(newUser);
  return newUser.id;
};
export const updateUser = (id: string, user: User) => {
  const index = users.findIndex(user => user.id === id && !user.isDeleted);

  if (index !== -1) {
    const updatedUser = { ...users[index], ...user };
    users[index] = updatedUser;
    return updatedUser;
  }
}
export const deleteUser = (id: string) => {
  const index = users.findIndex(user => user.id === id && !user.isDeleted);

  if (index !== -1) {
    users[index].isDeleted = true;
    return users[index];
  }
}

export const searchUserByLogin = (loginSubstring: string, limit: number = 3) => {
  const filteredUsers = loginSubstring 
  ? users.filter(user => user.login.toLowerCase().includes(loginSubstring.toLowerCase())).sort((a, b) => a['login'].localeCompare(b['login']))
  : [];

  if (limit) {
    return filteredUsers.slice(0, limit);
  }

  return filteredUsers;
}
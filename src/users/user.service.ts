import { UserModel } from './user.model';
import * as UserRepo from './user.memory.repository';
import HttpException from '../common/http-exception';
export class UserService {
  public getAll() {
    return UserRepo.getAll();
  }

  public async getUserById(id: string) {
    const user = await UserRepo.getById(id);
    if (user) {
      return user;
    } else {
      throw new HttpException(404, 'User not found');
    }
  }

  public async deleteUser(id: string) {
    const [,[deletedUser]] = await UserRepo.deleteOne(id);
    if (deletedUser) {
        return deletedUser.id;
    } else {
        throw new HttpException(404, 'User not found');
    }
  }

  public createUser(user: UserModel) {
    return UserRepo.createOne(user);
  }

  public async updateUser(id: string, user: UserModel) {
    const [,[updatedUser]] = await UserRepo.updateOne(id, user);
    if (updatedUser) {
        return updatedUser;
    } else {
        throw new HttpException(404, 'User not found');
    }
  }

  public async searchUserByLogin(loginSubstring: string, limit: number = 3) {
    if (loginSubstring && limit) {
        return UserRepo.searchByLogin(loginSubstring, limit);
    } else {
        throw new HttpException(400, 'Bad request');
    }
  }
}
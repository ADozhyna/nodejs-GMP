import { UserAttributes } from '../db/models/user.model';
import * as UserRepo from '../data-access/user.memory.repository';
import HttpException from '../common/http-exception';
export class UserService {
  public getAll() {
    return UserRepo.getAll();
  }

  public async getUserById(id: number) {
    const user = await UserRepo.getById(id);
    if (user) {
      return user;
    } else {
      throw new HttpException(404, 'User not found');
    }
  }

  public async deleteUser(id: number) {
    const [,[deletedUser]] = await UserRepo.deleteOne(id);
    if (deletedUser) {
        return deletedUser.id;
    } else {
        throw new HttpException(404, 'User not found');
    }
  }

  public createUser(user: UserAttributes) {
    return UserRepo.createOne(user);
  }

  public async updateUser(id: number, user: UserAttributes
    ) {
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
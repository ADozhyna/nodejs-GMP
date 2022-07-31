import { UserAttributes } from '../db/models/user.model';
import { UserRepository } from '../data-access/user.memory.repository';
import HttpException from '../common/http-exception';
export class UserService {
  private userRepository: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepository = userRepo
  }
  public getAll() {
    return this.userRepository.getAll();
  }

  public async getUserById(id: number) {
    const user = await this.userRepository.getById(id);
    if (user) {
      return user;
    } else {
      throw new HttpException('User not found', 404);
    }
  }

  public async deleteUser(id: number) {
    const [,[deletedUser]] = await this.userRepository.deleteOne(id);
    if (deletedUser) {
        return deletedUser.id;
    } else {
        throw new HttpException('User not found', 404);
    }
  }

  public createUser(user: UserAttributes) {
    return this.userRepository.createOne(user);
  }

  public async updateUser(id: number, user: UserAttributes
    ) {
    const [,[updatedUser]] = await this.userRepository.updateOne(id, user);
    if (updatedUser) {
        return updatedUser;
    } else {
        throw new HttpException('User not found', 404);
    }
  }

  public async searchUserByLogin(loginSubstring: string, limit: number = 3) {
    if (loginSubstring && limit) {
        return this.userRepository.searchByLogin(loginSubstring, limit);
    } else {
        throw new HttpException('Bad request', 400);
    }
  }
}
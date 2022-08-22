import HttpException from '../common/http-exception';
import { config } from 'dotenv';
import { User } from '../db/models/user.model';
import { UserRepository } from '../data-access/user.memory.repository';

config();
export class LoginService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public async loginUser(login: string, password: string) {
    const user = await this.repository.getUserByLogin(login);
    if (!user || password !== user.password || user.isDeleted) {
        throw new HttpException('Bad login/password combination', 401);
    }

    return user;
  }
}

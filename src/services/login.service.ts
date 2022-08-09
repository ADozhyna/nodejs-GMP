import HttpException from '../common/http-exception';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/user.model';

config();

export class LoginService {
  public async loginUser(login: string, password: string) {
    const user = await User.findOne({ where: { login } });
    if (!user || password !== user.password || user.isDeleted) {
        throw new HttpException('Bad login/password combination', 401);
    }

    const payload = { id: user.id, login: user.login, age: user.age }; 
    const token = jwt.sign(payload, process.env.TOKEN_KEY as string, { expiresIn: "2h" });
    return token;
  }
}

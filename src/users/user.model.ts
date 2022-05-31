import { v4 as uuidv4 } from 'uuid';

export class User {
  public id = uuidv4();

  constructor(
    public login: string,
    public password: string,
    public age: number,
    public isDeleted: boolean = false
  ) {}
}
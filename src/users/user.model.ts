import { DataTypes, Model } from 'sequelize';
import { db } from '../database/db';

export interface IUserModel {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

type UserInstanse = IUserModel & Model;
export class UserModel implements IUserModel {
  public id: number = 0;

  constructor(
    public login: string,
    public password: string,
    public age: number,
    public isDeleted: boolean = false
  ) {}
}

export const User = db.define<UserInstanse>(
  'Users',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
  },
);

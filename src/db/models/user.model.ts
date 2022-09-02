'use strict';
import { Model, DataTypes, CreationOptional, Optional } from 'sequelize';
import { sequelize } from '../sequelize';
import { Group } from './group.model';


export interface UserAttributes {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: CreationOptional<number>;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: boolean;

  static associate(models: any) {
    User.belongsToMany(models.Group, {
      through: 'UserGroup'
    })
  }
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'Users',
  sequelize,
});

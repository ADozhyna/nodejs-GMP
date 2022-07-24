import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export interface UserGroupAttributes {
  UserId: number,
  GroupId: number
};

export class UserGroup extends Model {
  public UserId!: number;
  public GroupId!: number;
  static associate(models: any) {
  }
}
UserGroup.init({
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
        model: 'Users',
        key: 'id'
    }
  },
  GroupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
        model: 'Groups',
        key: 'id'
    }
  }
}, {
  tableName: 'UserGroup',
  sequelize
});

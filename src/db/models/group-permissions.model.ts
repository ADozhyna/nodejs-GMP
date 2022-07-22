import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../sequelize';

export interface UserGroupAttributes {
  UserId: number,
  GroupId: number
};

export class UserGroup extends Model<UserGroupAttributes> implements UserGroup {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
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

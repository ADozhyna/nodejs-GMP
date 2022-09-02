import { Model, DataTypes, CreationOptional, Optional } from 'sequelize';
import { sequelize } from '../sequelize';
import { User } from './user.model';

type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupAttributes {
  id: number,
  name: string,
  permissions: Array<Permission>
};

type GroupCreationAttributes = Optional<GroupAttributes, 'id'>;

export class Group extends Model<GroupAttributes, GroupCreationAttributes> {
 
  public id!: CreationOptional<number>;
  public name!: string;
  public permissions!: Array<Permission>;
  static associate(models: any) {
    Group.belongsToMany(models.User, {
      through: 'UserGroup'
    })
  }
}
Group.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
    allowNull: false
  }
}, {
  tableName: 'Groups',
  sequelize
});

Group.belongsToMany(User, {
  through: 'UserGroup'
});

import { DataTypes, Model, Sequelize, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  gender?: boolean;
  image?: string;
  roleId?: string;
  positionId?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public address?: string;
  public phoneNumber?: string;
  public gender?: boolean;
  public image?: string;
  public roleId?: string;
  public positionId?: string;

  static associate(models: any) {
    // nếu có quan hệ thì định nghĩa ở đây
  }
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  User.init(
    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: dataTypes.STRING,
      },
      lastName: {
        type: dataTypes.STRING,
      },
      address: {
        type: dataTypes.STRING,
      },
      phoneNumber: {
        type: dataTypes.STRING,
      },
      gender: {
        type: dataTypes.BOOLEAN,
      },
      image: {
        type: dataTypes.STRING,
      },
      roleId: {
        type: dataTypes.STRING,
      },
      positionId: {
        type: dataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};

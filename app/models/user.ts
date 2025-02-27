import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import models from ".";
import { book } from "./book";

export enum Role {
  ADMIN = 0,
  MODERATOR = 1,
  MEMBER = 2,
}

export interface UserAttributes {
  fullName?: string;
  userName?: string;
  email?: string;
  iam_role?: string;
  hash_pwd?: string;
}

export interface UserInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  fullName: string;
  userName: string;
  email: string;
  iam_role: Role;
  hash_pwd: string;
}
export const user = sequelize.define("user", {
  fullName: Sequelize.STRING,
  userName: Sequelize.STRING,
  email: Sequelize.STRING,
  iam_role: Sequelize.INTEGER,
  hash_pwd: Sequelize.STRING,
});

export const associate = () => {
  user.hasMany(book, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "Books",
  });
};

export default { user, associate };

import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { user } from "./user";

export interface bookAttributes {
  title?: string;
  author?: string;
  publishedDate?: Date;
  userId?: number;
}

export interface bookInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  author: string;
  publishedDate: Date;
  userId: number;
}
export const book = sequelize.define("book", {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  publishedDate: Sequelize.DATE,
  userId: Sequelize.INTEGER,
});

export const associate = () => {
  book.belongsTo(user);
};
export default { book, associate };

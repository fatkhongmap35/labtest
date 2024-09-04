import { Request, Response } from "express";
import { Op } from "sequelize";
import models from "../models";

export class BookController {
  async create(req: Request, res: Response) {}

  public async index(req: Request, res: Response) {
    const userId = req.params.userId;
    const books = await models.book.findAll({
      where: {
        userId: {
          [Op.eq]: userId,
        },
      },
    });

    res.render("users.view/users.book.view/cart", { books: books });
  }
}

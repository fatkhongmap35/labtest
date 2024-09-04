import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from "./application.controller";

export class UserController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const users = await models.user.findAll();
    res.render("users.view/index", { users });
  }
}

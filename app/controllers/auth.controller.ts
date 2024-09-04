import env from "@configs/env"; // Assuming this is the correct import for env
import models from "@models";
import { Role, UserInstance } from "@models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"; // Assuming this is the correct import for jwt
import { ApplicationController } from "./application.controller";

export class AuthController extends ApplicationController {
  // sign-up create new user account
  public async new(req: Request, res: Response) {
    res.render("auth.view/new");
  }

  public async signup(req: Request, res: Response) {
    try {
      const { fullName, userName, email, password } = req.body;
      const hashPwd = await bcrypt.hash(password, 10);
      const user = await models.user.create({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        iam_role: Role.MEMBER,
        hash_pwd: hashPwd,
      });
      res.json({ message: "User created successfully" });
    } catch (error) {
      res.json({ message: "Error creating user", error });
    }
  }

  // sign-in user with username and password
  public async signIn(req: Request, res: Response) {
    const { userName, password } = req.body;
    const user = (await models.user.findOne({
      where: { userName },
    })) as UserInstance;

    if (!user) {
      return res.json({ message: "Tên đăng nhập không tồn tại" });
    }

    const PasswordValid = await bcrypt.compare(password, user.hash_pwd);

    if (!PasswordValid) {
      return res.json({ message: "Mật khẩu không đúng" });
    }
    if (!env.jwtSecret) {
      throw new Error("JWT secret is not defined");
    }
    const token = jwt.sign(
      { userId: user.id, userName: user.userName },
      env.jwtSecret,
      { expiresIn: "30s" }
    );

    res.json({ message: "Đăng nhập thành công", token });
  }

  public async login(req: Request, res: Response) {
    res.render("auth.view/login");
  }
}

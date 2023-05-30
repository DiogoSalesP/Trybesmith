import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { IUser } from '../interfaces/IUser';

export default class LoginController {
  loginService: LoginService;

  constructor(loginService = new LoginService()) {
    this.loginService = loginService;
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    const userCredentials = req.body as IUser;
    const { status, token, error, message } = await this.loginService.login(userCredentials);
    return error
      ? res.status(status).json({ message })
      : res.status(status).json({ token });
  }
}
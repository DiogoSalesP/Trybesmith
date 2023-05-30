import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { IUser } from '../interfaces/IUser';

export default class UserController {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const user = req.body as IUser;
    const { status, token } = await this.userService.create(user);
    res.status(status).json({ token });
  }
}
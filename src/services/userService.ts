import { IUser } from '../interfaces/IUser';
import connection from '../models/connection';
import UserModel from '../models/userModel';
import TokenService from '../utils/TokenService';
import statusCodes from '../utils/statuCodes';

export default class UserService {
  userModel: UserModel;

  TokenService: TokenService;

  constructor() {
    this.userModel = new UserModel(connection);
    this.TokenService = new TokenService();
  }

  async create(user: IUser) {
    await this.userModel.create(user);
    const token = this.TokenService.createToken(user);
    return { status: statusCodes.CREATED, token };
  }
}
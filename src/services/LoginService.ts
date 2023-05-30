import { IUser } from '../interfaces/IUser';
import LoginModel from '../models/LoginModel';
import connection from '../models/connection';
import TokenService from '../utils/TokenService';
import statusCodes from '../utils/statuCodes';

export default class LoginService {
  loginModel: LoginModel;

  tokenService: TokenService;

  constructor() {
    this.loginModel = new LoginModel(connection);
    this.tokenService = new TokenService();
  }

  async login(userCredentials: IUser) {
    const result = await this.loginModel.login(userCredentials);    
    if (result === null || result.password !== userCredentials.password) {
      return { error: true,
        status: statusCodes.UNAUTHORIZED,
        message: 'Username or password invalid' };
    }
    const token = this.tokenService.createToken(result);
    return { status: statusCodes.OK, token };
  }
}
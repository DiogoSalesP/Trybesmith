import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

export default class TokenService {
  secret: string;

  signature: jwt.SignOptions;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'jwt_secret';
    this.signature = { expiresIn: '1d', algorithm: 'HS256' };
  }

  public createToken(user:IUser): string {
    const { username } = user;
    const payload = { username };
    return jwt.sign(payload, this.secret, this.signature);
  }
}
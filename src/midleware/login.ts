import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/IUser';
import statusCodes from '../utils/statuCodes';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body as IUser;
  if (!username) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: '"username" is required' });
  }
  if (!password) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: '"password" is required' });
  }
  return next();
};

export default validateLogin;

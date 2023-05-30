import { Pool } from 'mysql2/promise';
import { IUser } from '../interfaces/IUser';

export default class LoginModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async login(user: IUser): Promise<IUser | null> {
    const { username } = user;
    const value = [username];
    const query = 'SELECT * FROM Trybesmith.users WHERE username = ?';
    const [data] = await this.connection.execute(query, value);
    const [result] = data as IUser[];
    return result || null;
  }
}
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async create(user: IUser): Promise<IUser> {
    const { username, vocation, level, password } = user;
    const query = `
    INSERT INTO Trybesmith.users (username, vocation, level, password) VALUES (?,?,?,?)
    `;
    const value = [username, vocation, level, password];
    const [result] = await this.connection.execute<ResultSetHeader>(query, value);
    const { insertId: id } = result;
    const newUser: IUser = { id, username, vocation, level, password };
    return newUser;
  }
}
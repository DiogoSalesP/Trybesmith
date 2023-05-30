import { Pool, RowDataPacket } from 'mysql2/promise';
import { IOrder } from '../interfaces/IOrder';

export default class OrderModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async getAll(): Promise<IOrder[]> {
    const query = `
    SELECT O.id, O.user_id AS userId,
    JSON_ARRAYAGG(P.id) AS productsIds
    FROM Trybesmith.orders AS O
    INNER JOIN
    Trybesmith.products AS P WHERE O.id = P.order_id
    GROUP BY O.id;`;
    const [result] = await this.connection.execute<RowDataPacket[]>(query);
    return result as IOrder[];
  }
}
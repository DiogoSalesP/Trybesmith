import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/IProduct';

export default class ProductModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const values = [name, amount];
    const query = 'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)';
    const [result] = await this.connection.execute<ResultSetHeader>(query, values);
    const { insertId: id } = result;
    const newProduct: IProduct = { id, name, amount };
    return newProduct;
  }
}

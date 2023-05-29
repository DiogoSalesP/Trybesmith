import { IProduct } from '../interfaces/IProduct';
import connection from '../models/connection';
import ProductModel from '../models/ProductModel';
import statusCodes from '../utils/statuCodes';

export default class ProductService {
  productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  async create(product: IProduct) {
    const result = await this.productModel.create(product);
    return { status: statusCodes.CREATED, result };
  }

  async getAll() {
    const products = await this.productModel.getAll();
    return { status: statusCodes.OK, products };
  }
}
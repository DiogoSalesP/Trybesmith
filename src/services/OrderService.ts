import OrderModel from '../models/OrderModel';
import connection from '../models/connection';
import statusCodes from '../utils/statuCodes';

export default class OrderService {
  orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  async getAll() {
    const result = await this.orderModel.getAll();
    return { status: statusCodes.OK, result };
  }
}
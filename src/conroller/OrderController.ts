import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

export default class OrderController {
  orderService: OrderService;

  constructor(orderSevice = new OrderService()) {
    this.orderService = orderSevice;
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const { status, result } = await this.orderService.getAll();
    res.status(status).json(result);
  }
}
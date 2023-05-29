import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { IProduct } from '../interfaces/IProduct';

export default class ProductController {
  productService: ProductService;

  constructor(productService = new ProductService()) {
    this.productService = productService;
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<void> {
    const product = req.body as IProduct;
    const { status, result } = await this.productService.create(product);
    res.status(status).json(result);
  }
}
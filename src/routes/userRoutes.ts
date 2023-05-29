import { Router } from 'express';
import ProductController from '../conroller/ProductController';

const router = Router();
const productController = new ProductController();

router
  .route('/products')
  .get(productController.getAll)
  .post(productController.create);

export default router;

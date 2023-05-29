import { Router } from 'express';
import ProductController from '../conroller/ProductController';
import UserController from '../conroller/UserController';

const router = Router();
const productController = new ProductController();
const userConroller = new UserController();

router
  .route('/products')
  .get(productController.getAll)
  .post(productController.create);

router
  .route('/users')
  .post(userConroller.create);

export default router;

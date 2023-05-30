import { Router } from 'express';
import ProductController from '../conroller/ProductController';
import UserController from '../conroller/UserController';
import OrderController from '../conroller/OrderController';

const router = Router();
const productController = new ProductController();
const userConroller = new UserController();
const orderController = new OrderController();

router
  .route('/products')
  .get(productController.getAll)
  .post(productController.create);

router
  .route('/users')
  .post(userConroller.create);

router
  .route('/orders')
  .get(orderController.getAll);

export default router;

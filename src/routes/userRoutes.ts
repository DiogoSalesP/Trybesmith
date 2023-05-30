import { Router } from 'express';
import ProductController from '../conroller/ProductController';
import UserController from '../conroller/UserController';
import OrderController from '../conroller/OrderController';
import validateLogin from '../midleware/login';
import LoginController from '../conroller/LoginController';

const router = Router();
const productController = new ProductController();
const userConroller = new UserController();
const orderController = new OrderController();
const loginController = new LoginController();

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

router
  .route('/login')
  .post(validateLogin, loginController.login);

export default router;

import Router, { Application } from 'express';
import Container from 'typedi';
import UserController from '../../controllers/userController';
import UserValidator from '../../validators/userValidator';

class UserRoutes {
  userRouter: Application = Router();
  private userCtrl = Container.get(UserController);
  private validator = Container.get(UserValidator);
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.userRouter.route('/auth/register').post(this.validator.validateAdminCreateBody, this.userCtrl.addNewAdmin);
    this.userRouter.route('/auth/login').post(this.validator.validateLoginBody, this.userCtrl.loginUser);

    this.userRouter
      .route('/')
      .post(this.validator.validateUserCreateBody, this.userCtrl.addNewUser)
      .get(this.userCtrl.getAllUsers);

    this.userRouter.route('/:userId').put(this.userCtrl.updateUser).delete(this.userCtrl.deleteUser);
  }
}

export default new UserRoutes().userRouter;

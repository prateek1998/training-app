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
    this.userRouter.route('/register').post(this.validator.validateCreateBody, this.userCtrl.addNewUser);
    // .get(this.userCtrl.getAllDepts)

    // this.userRouter.route('/:deptId')
    //   .put(this.validator.validateUpdateBody, this.userCtrl.updateDept)
    //   .delete(this.userCtrl.deleteDept);
  }
}

export default new UserRoutes().userRouter;

import Router, { Application } from 'express';
import Container from 'typedi';
import DeptController from '../../controllers/deptController';
import DeptValidator from '../../validators/deptValidator';

class DeptRoutes {
  deptRouter: Application = Router();
  private deptCtrl = Container.get(DeptController);
  private validator = Container.get(DeptValidator);
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.deptRouter
      .route('/')
      .get(this.deptCtrl.getAllDepts)
      .post(this.validator.validateCreateBody, this.deptCtrl.addNewDept);

    this.deptRouter
      .route('/:deptId')
      .put(this.validator.validateUpdateBody, this.deptCtrl.updateDept)
      .delete(this.deptCtrl.deleteDept);
  }
}

export default new DeptRoutes().deptRouter;

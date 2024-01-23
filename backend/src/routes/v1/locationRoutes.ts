import Router, { Application } from 'express';
import Container from 'typedi';
import LocationController from '../../controllers/locController';
import LocationValidator from '../../validators/locationValidator'; 

class LocRoutes {
  deptRouter: Application = Router();
  private locCtrl = Container.get(LocationController);
  private validator = Container.get(LocationValidator);
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.deptRouter.route('/')
      .get(this.locCtrl.getAllDepts)
      .post(this.validator.validateCreateBody, this.locCtrl.addNewLocation);

    this.deptRouter.route('/:deptId')
      .put(this.validator.validateUpdateBody, this.locCtrl.updateDept)
      .delete(this.locCtrl.deleteDept);
  }
}

export default new LocRoutes().deptRouter;
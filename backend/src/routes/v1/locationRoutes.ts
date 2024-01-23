import Router, { Application } from 'express';
import Container from 'typedi';
import LocationController from '../../controllers/locController';
import LocValidator from '../../validators/locationValidator';

class LocationRoutes {
  locRouter: Application = Router();
  private locCtrl = Container.get(LocationController);
  private validator = Container.get(LocValidator);
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.locRouter.route('/')
      // .get(this.locCtrl.getAllDepts)
      .post(this.validator.validateCreateBody, this.locCtrl.addNewLocation);

    // this.locRouter.route('/:deptId')
    //   .put(this.validator.validateUpdateBody, this.locCtrl.updateDept)
    //   .delete(this.locCtrl.deleteDept);
  }
}

export default new LocationRoutes().locRouter;
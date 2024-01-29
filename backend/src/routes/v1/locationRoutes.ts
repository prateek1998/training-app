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
    this.deptRouter.route('/').get(this.locCtrl.getAllLocations).post(this.validator.validateCreateBody, this.locCtrl.addNewLocation);

    this.deptRouter.route('/:locId').put(this.validator.validateUpdateBody, this.locCtrl.updateLocation).delete(this.locCtrl.deleteLocation);
  }
}

export default new LocRoutes().deptRouter;

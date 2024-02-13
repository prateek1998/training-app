import Router, { Application } from 'express';
import Container from 'typedi';
import EventController from '../../controllers/eventController';
import EventValidator from '../../validators/eventValidator';

class EventRoutes {
  userRouter: Application = Router();
  private eventCtrl = Container.get(EventController);
  private validator = Container.get(EventValidator);
  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.userRouter.route('/').post(this.validator.validateCreateBody, this.eventCtrl.addNewEvent)
      .get(this.eventCtrl.getAllEvents);

    // this.userRouter.route('/:userId')
    //   .put(this.userCtrl.updateUser)
    //   .delete(this.userCtrl.deleteUser);
  }
}

export default new EventRoutes().userRouter;

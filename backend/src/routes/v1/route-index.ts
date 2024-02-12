import { Router } from 'express';
import UserRoutes from './userRoutes';
import DeptRoutes from './deptRoutes';
import EventRoutes from './eventRoutes';
import locationRoutes from './locationRoutes';

class V1RouteHandler {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/users', UserRoutes);
    this.router.use('/depts', DeptRoutes);
    this.router.use('/events', EventRoutes);
    this.router.use('/locations', locationRoutes);
  }
}

export default new V1RouteHandler().router;

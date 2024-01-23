import { Router } from 'express';
import UserRoutes from './userRoutes';
import DeptRoutes from './deptRoutes';

class V1RouteHandler {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/users', UserRoutes);
    this.router.use('/depts', DeptRoutes);
  }
}

export default new V1RouteHandler().router;

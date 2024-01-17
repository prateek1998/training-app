import { Application } from 'express';
import UserRoutes from './userRoutes';

export default class Routes {
  constructor(app: Application) {
    app.use('/api/v1/users', UserRoutes);
  }
}

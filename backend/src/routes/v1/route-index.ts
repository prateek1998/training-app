import { Router } from 'express';
import UserController from 
// import AppRoutes from './applicationsRoutes';

export default class Routes {
  constructor(app: Application) {
    app.use('/api/v1/applications', AppRoutes);
  }
}

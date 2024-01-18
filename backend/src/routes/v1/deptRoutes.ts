import Router, { Application } from 'express';
import Container from 'typedi';
import DeptController from '../../controllers/deptController';
import DeptValidator from '../../validators/deptValidator';
//  from '../../validators';

class DeptRoutes {
    deptRouter: Application = Router();
    private deptCtrl = Container.get(DeptController);
    private validator = Container.get(DeptValidator)
    constructor(){
        this.intializeRoutes();
    }
    
    intializeRoutes(){
        this.deptRouter.route('/')
            .get(this.deptCtrl.getAllDepts)
            .post(this.validator.validateCreateBody, this.deptCtrl.addNewDept)
    //   .post(
    //     (req, res, next) => this.classifyValidator.validateCreateBody(req, res, next),
    //     (req, res) => this.classifyCtrl.addNewClassification(req, res)
    //   )
    //   .get((req, res) => console.log("first"));

        // this.userRouter.route('/').get((req, res) => console.log("222"))
    }
}

export default new DeptRoutes().deptRouter;
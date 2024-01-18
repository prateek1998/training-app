import Router, { Application } from 'express';
import UserController from '../../controllers/userController';
import Container from 'typedi';
class UserRoutes {
    userRouter: Application = Router();
    private userCtrl = Container.get(UserController);

    // private static serverPort: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    // private static accessLogStream: WriteStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });
    constructor(){
        this.intializeRoutes();
    }
    intializeRoutes(){
        this.userRouter.route('/').get()
    //   .post(
    //     (req, res, next) => this.classifyValidator.validateCreateBody(req, res, next),
    //     (req, res) => this.classifyCtrl.addNewClassification(req, res)
    //   )
      .get((req, res) => console.log("first"));

        // this.userRouter.route('/').get((req, res) => console.log("222"))
    }
}

export default new UserRoutes().userRouter;
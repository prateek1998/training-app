import { Response, Request } from 'express';
import BaseController from "./baseController";
import UserRepo from '../repositories/userRepository';
import Logger from "../utils/winston.utils";
import Status from "../utils/status-codes-messages.utils";
import { Service } from 'typedi';
@Service()
class UserController extends BaseController{
    constructor(private userRepo: UserRepo) {
        super()
    }

    addNewUser =async (req:Request, res: Response) => {
        let data = req.body;
        console.log(data);
        console.log(this.userRepo.addNewUser(data))
    }
}

export default UserController;
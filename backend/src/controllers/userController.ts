import { Response, Request } from 'express';
import BaseController from "./baseController";

import Logger from "../utils/winston.utils";
import Status from "../utils/status-codes-messages.utils";

class UserController extends BaseController{
    constructor(){
        super();
    }
}

export default UserController;
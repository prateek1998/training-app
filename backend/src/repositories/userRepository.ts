import UserModel from "../models/UserModel";
import { IUser } from "../types";

export default class UserRepo {

    addNewUser(data:IUser){
        console.log(data);
        return UserModel.create(data);
    }
    getAllUser(){
        return UserModel.find()
    }

}
import { Service } from 'typedi';
import UserModel from '../models/UserModel';
import { IUser } from '../types';

@Service()
export default class UserRepo {
  addNewUser(data: IUser) {
    console.log(data);
    // return UserModel.create(data);
  }
  getAllUser() {
    return UserModel.find();
  }
}

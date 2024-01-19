import { Service } from "typedi";
import DeptModel from "../models/DepartmentModel";
import { IDeptartment } from "../types";

@Service()
export default class DeptRepo {
    addNewDept(data:IDeptartment){
        return DeptModel.create(data);
    }
    getAllDepts(query:any){
        return DeptModel.find()
    }

    getDeptByName(title: string){
        return DeptModel.findOne({deptName: title});
    }

}
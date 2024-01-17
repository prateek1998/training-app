import BaseResponse from "../utils/base-response.utils";
import StatusMessage from "../utils/status-codes-messages.utils";

export default class BaseController extends BaseResponse {
    protected getDbError(reason: any) {
        console.log("reason.name", reason.name)
        let errCode: number;
        switch (reason.name) {
            case StatusMessage.DB_ERRORS.accessDeniedError:
                errCode = 1024;
                break;
            case StatusMessage.DB_ERRORS.uniqueConstantError:
                errCode = 1062;
                break;
            case StatusMessage.DB_ERRORS.validationError:
                errCode = 1063;
                break;
            case StatusMessage.DB_ERRORS.MongoDBConnectionError:
                errCode = 1064;
                break;
            default:
                errCode = 1001;
                break;
        }
        return {
            error: true,
            errCode: 500,
        };
    }
    protected getModifiedError(err: any, errMsg: Array<any>) {
        errMsg[0] = err.errCode;
        return errMsg;
    }
}
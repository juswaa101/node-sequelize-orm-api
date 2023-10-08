import { Response } from "express";

class ResponseHelper {

    success = (res: Response, msg: string, statusCode: number, data: any = null) => {
        return res.status(statusCode).json({ msg, data });
    }

    error = (res: Response, msg: string, statusCode: number) => {
        return res.status(statusCode).json({ msg });
    }

}

export default ResponseHelper;
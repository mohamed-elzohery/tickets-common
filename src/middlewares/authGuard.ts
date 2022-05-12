import { catchAsync } from "./async-error-handler";
import { ErrorResponse } from "../utils/ErrorResponse";
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface User{
    id: string;
    email: string
}
declare global{
    namespace Express{
        interface Request{
            user?: User
        }
    }
}

const authGuard = (UserModel: any) => ( catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies['token_uid'];
    if(!token){
        return next(new ErrorResponse(401, 'Unauthenticated access', 'AuthErr'));
    }
    const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
    const id = decodedToken.id;
    const user = await UserModel.findById(id);
    if(!user){
        return next(new ErrorResponse(401, 'Unauthenticated access', 'AuthErr'));
    }
    const loggedUser = {id, email: user.email}
    req.user = loggedUser;
    next();
}))

export {authGuard};
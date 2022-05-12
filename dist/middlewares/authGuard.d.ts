/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
interface User {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
declare const authGuard: (UserModel: any) => (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
export { authGuard };

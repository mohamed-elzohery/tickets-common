import { Request, Response, NextFunction } from "express";
declare const asyncErrorHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { asyncErrorHandler as catchAsync };

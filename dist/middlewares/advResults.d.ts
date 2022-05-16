import { Request, NextFunction } from 'express';
declare const adjustRes: (model: any) => (req: Request, res: any, next: NextFunction) => Promise<void>;
export { adjustRes as advResults };

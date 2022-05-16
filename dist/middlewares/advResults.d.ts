import { Request, Response, NextFunction } from 'express';
interface pagination {
    next?: {
        page: number;
        limit: number;
    };
    prev?: {
        page: number;
        limit: number;
    };
}
interface AdvancedResponse extends Response {
    adjustRes?: {
        success: boolean;
        count: number;
        pagination: pagination;
        data: any;
    };
}
declare const adjustRes: (model: any) => (req: Request, res: AdvancedResponse, next: NextFunction) => Promise<void>;
export { adjustRes as advResults };

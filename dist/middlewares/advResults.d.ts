import { Response, NextFunction } from 'express';
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
    adjustRes: {
        success: boolean;
        count: number;
        pagination: pagination;
        data: any;
    };
}
interface QueryReq extends Response {
    query: {
        [props: string]: any;
    };
}
declare const adjustRes: (model: any) => (req: QueryReq, res: AdvancedResponse, next: NextFunction) => Promise<void>;
export { adjustRes as advResults };

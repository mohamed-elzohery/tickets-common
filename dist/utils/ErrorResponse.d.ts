declare class ErrorResponse implements Error {
    code: number;
    name: string;
    message: string;
    keyValue: string;
    constructor(code: number, message: string, name: string, keyValue?: string);
}
export { ErrorResponse };

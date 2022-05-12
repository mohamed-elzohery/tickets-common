"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
class ErrorResponse {
    constructor(code, message, name, keyValue = '') {
        this.code = code;
        this.name = name;
        this.message = message;
        this.keyValue = keyValue;
    }
}
exports.ErrorResponse = ErrorResponse;

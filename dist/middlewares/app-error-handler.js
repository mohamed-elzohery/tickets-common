"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ErrorResponse_1 = require("../utils/ErrorResponse");
const errorHandler = (err, req, res, next) => {
    let { message, code, name } = err;
    const error = new ErrorResponse_1.ErrorResponse(code || 500, message || 'Server Error', name || 'unknown error');
    //handle non-mongoose-ObjectID-like values.
    if (err.name && err.name === 'CastError') {
        error.message = 'Cannot find',
            error.code = 404;
    }
    //Schema validation errors
    //handle normal validation errors.
    if (err.name && err.name === 'ValidationError') {
        error.message = Object.keys(err.errors).map(error => err.errors[error].properties.message),
            error.code = 400;
    }
    if (err.name && err.name === 'JsonWebTokenError') {
        error.message = 'Token is not valid',
            error.code = 400;
    }
    //handle duplicate key error.
    if (err.code && err.code === 11000) {
        error.message = 'Email is taken',
            error.code = 400;
    }
    //handle unique key validation
    res.status(error.code).json({ error, success: false });
};
exports.errorHandler = errorHandler;

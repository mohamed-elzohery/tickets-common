"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const async_error_handler_1 = require("./async-error-handler");
const ErrorResponse_1 = require("../utils/ErrorResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authGuard = (UserModel) => ((0, async_error_handler_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token_uid'];
    if (!token) {
        return next(new ErrorResponse_1.ErrorResponse(401, 'Unauthenticated access', 'AuthErr'));
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.id;
    const user = yield UserModel.findById(id);
    if (!user) {
        return next(new ErrorResponse_1.ErrorResponse(401, 'Unauthenticated access', 'AuthErr'));
    }
    const loggedUser = { id, email: user.email };
    req.user = loggedUser;
    next();
})));
exports.authGuard = authGuard;

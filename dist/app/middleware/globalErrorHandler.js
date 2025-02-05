"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const AppError_1 = __importDefault(require("../error/AppError"));
function globalErrorHandler(err, req, res, next) {
    let message = 'Something went wrong';
    let statusCode = 500;
    if (err instanceof AppError_1.default) {
        message = err.message;
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        status: statusCode,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
}

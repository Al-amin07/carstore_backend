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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../error/AppError"));
const catchAsync_1 = require("../utils/catchAsync");
const config_1 = require("../config");
const user_model_1 = require("../modules/user/user.model");
const auth = (...roles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!token) {
            throw new AppError_1.default(405, 'UnAuthorize access!!!');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.access_token_secret);
        if (!roles.includes(decoded === null || decoded === void 0 ? void 0 : decoded.role)) {
            throw new AppError_1.default(403, 'Unauthorized access');
        }
        const isUserExist = yield user_model_1.User.findOne({ email: decoded === null || decoded === void 0 ? void 0 : decoded.email });
        if (!isUserExist) {
            throw new AppError_1.default(404, 'User not found');
        }
        if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.status) === 'blocked') {
            throw new AppError_1.default(409, 'This user is blocked');
        }
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;

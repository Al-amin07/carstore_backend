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
exports.userServices = void 0;
const hashPassword_1 = require("./../../utils/hashPassword");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const AppError_1 = __importDefault(require("../../error/AppError"));
const comparePassword_1 = require("../../utils/comparePassword");
const generateToken_1 = require("../../utils/generateToken");
const user_model_1 = require("./user.model");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new AppError_1.default(409, 'User already exists with this email');
    }
    payload.password = yield (0, hashPassword_1.hashPassword)(payload.password);
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found!!!');
    }
    const isPasswordSame = yield (0, comparePassword_1.comparePassword)(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordSame) {
        throw new AppError_1.default(403, 'Incorrect Password');
    }
    const payloadData = {
        id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    };
    const accessToken = yield (0, generateToken_1.generateToken)(payloadData, config_1.config.access_token_secret, config_1.config.access_token_expire_date);
    const refreshToken = yield (0, generateToken_1.generateToken)(payloadData, config_1.config.refrest_token_secret, config_1.config.refresh_token_expire_date);
    return {
        accessToken,
        refreshToken,
    };
});
const changePassword = (decoded, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ decoded, payload });
    const isUserExist = yield user_model_1.User.findOne({ email: decoded === null || decoded === void 0 ? void 0 : decoded.email });
    const isPasswordSame = yield (0, comparePassword_1.comparePassword)(payload === null || payload === void 0 ? void 0 : payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordSame) {
        throw new AppError_1.default(409, 'Wrong current password');
    }
    console.log({ isPasswordSame, payload });
    const hashedPassword = yield (0, hashPassword_1.hashPassword)(payload === null || payload === void 0 ? void 0 : payload.newPassword);
    const result = yield user_model_1.User.findOneAndUpdate({ email: decoded === null || decoded === void 0 ? void 0 : decoded.email }, { password: hashedPassword }, { new: true });
    return result;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(404, 'Token not found');
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.config.refrest_token_secret);
    const isUserExist = yield user_model_1.User.findOne({
        email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
    });
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found');
    }
    const jwtPayload = {
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    };
    const accessToken = yield (0, generateToken_1.generateToken)(jwtPayload, config_1.config.access_token_secret, config_1.config.access_token_expire_date);
    return { accessToken };
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id).select('-password');
    return result;
});
exports.userServices = {
    registerUser,
    loginUser,
    changePassword,
    refreshToken,
    getAllUser,
    getSingleUser,
    updateUser,
    getMe,
};

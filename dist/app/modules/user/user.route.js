"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middleware/auth");
const route = (0, express_1.Router)();
route.post('/register', user_controller_1.userControllers.registerUser);
route.post('/login', user_controller_1.userControllers.loginUser);
route.patch('/change-password', (0, auth_1.auth)('admin', 'user'), user_controller_1.userControllers.changePassword);
route.post('/refresh-token', user_controller_1.userControllers.refreshToken);
route.get('/all-user', (0, auth_1.auth)('admin'), user_controller_1.userControllers.getAlluser);
route.get('/user/:userId', (0, auth_1.auth)('admin'), user_controller_1.userControllers.getSingleUser);
route.get('/user/get-me/:userId', (0, auth_1.auth)('admin', 'user'), user_controller_1.userControllers.getMe);
route.put('/user/:userId', (0, auth_1.auth)('admin'), user_controller_1.userControllers.updateUser);
route.put('/user/change-password/:userId', (0, auth_1.auth)('admin', 'user'), user_controller_1.userControllers.changePassword);
exports.userRoute = route;

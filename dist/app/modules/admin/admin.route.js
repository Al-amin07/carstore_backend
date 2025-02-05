"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const route = (0, express_1.Router)();
route.get('/', admin_controller_1.adminController.getAdminData);
exports.adminRoute = route;

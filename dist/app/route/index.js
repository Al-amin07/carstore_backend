"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_route_1 = require("../modules/car/car.route");
const order_route_1 = require("../modules/order/order.route");
const user_route_1 = require("../modules/user/user.route");
const admin_route_1 = require("../modules/admin/admin.route");
const route = (0, express_1.Router)();
const modules = [
    { path: '/cars', route: car_route_1.carRoute },
    { path: '/orders', route: order_route_1.orderRoute },
    { path: '/auth', route: user_route_1.userRoute },
    { path: '/admin', route: admin_route_1.adminRoute },
];
modules.forEach((el) => route.use(el.path, el.route));
exports.default = route;

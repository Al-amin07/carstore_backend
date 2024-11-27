"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const route = express_1.default.Router();
route.get('/', order_controller_1.orderControllers.getAllOrder);
route.get('/revenue', order_controller_1.orderControllers.calculateRevenue);
route.post('/', order_controller_1.orderControllers.createOrder);
route.all('/*', order_controller_1.orderControllers.handleUnknownRoute);
exports.orderRoute = route;

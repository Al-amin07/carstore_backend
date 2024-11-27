"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoute = void 0;
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("./car.controller");
const route = express_1.default.Router();
route.get('/', car_controller_1.carControllers.getAllCars);
route.get('/:carId', car_controller_1.carControllers.getSingleCar);
route.put('/:carId', car_controller_1.carControllers.updateSingleCar);
route.post('/', car_controller_1.carControllers.createCar);
route.delete('/:carId', car_controller_1.carControllers.deleteCar);
route.all('/*', car_controller_1.carControllers.handleUnknownRoute);
exports.carRoute = route;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRoute = void 0;
const express_1 = __importDefault(require("express"));
const car_controller_1 = require("./car.controller");
const sendImageToCLoudnary_1 = require("../../utils/sendImageToCLoudnary");
const auth_1 = require("../../middleware/auth");
const route = express_1.default.Router();
route.get('/', car_controller_1.carControllers.getAllCars);
route.get('/:carId', car_controller_1.carControllers.getSingleCar);
route.put('/:carId', car_controller_1.carControllers.updateSingleCar);
route.post('/', sendImageToCLoudnary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, auth_1.auth)('admin'), car_controller_1.carControllers.createCar);
route.delete('/:carId', (0, auth_1.auth)('admin'), car_controller_1.carControllers.deleteCar);
exports.carRoute = route;

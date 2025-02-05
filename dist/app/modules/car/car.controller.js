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
Object.defineProperty(exports, "__esModule", { value: true });
exports.carControllers = void 0;
const sendResponse_1 = require("./../../utils/sendResponse");
const car_service_1 = require("./car.service");
const catchAsync_1 = require("../../utils/catchAsync");
// Create New Car
const createCar = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carDetails = req.body;
    const file = req.file;
    console.log({ file });
    const result = yield car_service_1.carServices.createCarToDB(file, carDetails);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 200,
        message: 'Car created successfully',
        data: result,
    });
}));
// Get All Car
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield car_service_1.carServices.getAllCarsFromDB(query);
        res.json({
            status: true,
            message: 'Cars retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Validation failed',
            error,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
// Get Single Car
const getSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const result = yield car_service_1.carServices.getSignleCarFromDB(carId);
        res.json({
            status: true,
            message: 'Car retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Validation failed',
            error,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
// Update a Car
const updateSingleCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const updatedDetails = req.body;
        const result = yield car_service_1.carServices.updateSingleCarFromDB(carId, updatedDetails);
        res.json({
            status: true,
            message: 'Car updated successfully',
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Validation failed',
            error: error,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
// Delete A Car
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        // console.log({ carId });
        const result = yield car_service_1.carServices.deleteCarFromDB(carId);
        console.log(result);
        res.json({
            status: true,
            message: 'Car deleted successfully',
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: 'Validation failed',
            error,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
exports.carControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    deleteCar,
    updateSingleCar,
};

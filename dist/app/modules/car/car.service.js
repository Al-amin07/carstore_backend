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
exports.carServices = void 0;
const car_model_1 = __importDefault(require("./car.model"));
// Create Car Service
const createCarToDB = (car) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.create(car);
    return result;
});
// Get All Car Service
const getAllCarsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.find({});
    return result;
});
// Get Single Car Service
const getSignleCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.findById(id);
    return result;
});
// Update a Car
const updateSingleCarFromDB = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield car_model_1.default.updateOne({ _id: id }, Object.assign({}, obj), { runValidators: true });
    const result = yield car_model_1.default.findById(id);
    return result;
});
// Delete A Car Service
const deleteCarFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield car_model_1.default.deleteOne({ _id: id });
    return result;
});
exports.carServices = {
    createCarToDB,
    getAllCarsFromDB,
    getSignleCarFromDB,
    deleteCarFromDB,
    updateSingleCarFromDB,
};

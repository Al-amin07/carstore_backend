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
exports.adminServices = void 0;
const car_model_1 = __importDefault(require("../car/car.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const user_model_1 = require("../user/user.model");
const getAdminData = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalOrder = yield order_model_1.default.estimatedDocumentCount();
    const totalUser = yield user_model_1.User.estimatedDocumentCount();
    const totalCar = yield car_model_1.default.estimatedDocumentCount();
    const totalRevenu = yield order_model_1.default.aggregate([
        { $project: { totalPrice: 1, quantity: 1 } },
        {
            $group: {
                _id: null,
                price: { $sum: '$totalPrice' },
            },
        },
    ]);
    return {
        totalCar,
        totalOrder,
        totalUser,
        totalRevenu,
    };
});
exports.adminServices = {
    getAdminData,
};

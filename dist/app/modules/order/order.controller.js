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
exports.orderControllers = void 0;
const order_service_1 = require("./order.service");
const car_model_1 = __importDefault(require("../car/car.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const isCarExist = yield car_model_1.default.findById(order.car);
        const result = yield order_service_1.orderServices.createOrderToDB(order);
        if (!isCarExist) {
            return res.status(404).json({
                message: 'Something went wrong',
                status: false,
                error: {
                    message: 'Car is not founded!!!',
                },
            });
        }
        if (isCarExist && !isCarExist.inStock) {
            return res.status(404).json({
                message: 'Something went wrong',
                status: false,
                error: {
                    message: 'Car is out of stock!!!',
                },
            });
        }
        if (isCarExist.quantity < order.quantity) {
            return res.status(404).json({
                message: 'Something went wrong',
                status: false,
                error: {
                    message: `Insufficient Car! ${isCarExist.quantity} cars are available`,
                },
            });
        }
        const inStock = isCarExist.quantity - order.quantity > 0;
        const updatedResult = yield car_model_1.default.findByIdAndUpdate(order.car, {
            $set: {
                quantity: isCarExist.quantity - order.quantity,
                inStock,
            },
        }, {
            new: true,
            runValidators: true,
        });
        console.log(updatedResult);
        // const result = await orderServices.createOrderToDB(order);
        return res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: result,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: 'Something went wrong',
            status: false,
            error,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
// const createOrder = async (req: Request, res: Response) => {
//   const order = req.body;
//   const result = await orderServices.createOrderToDB(order);
//   res.json({
//     status: true,
//     data: result,
//   });
// };
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderServices.getAllOrdersFromDB();
        res.json({
            status: true,
            message: 'Order retrived successfully',
            data: result,
        });
    }
    catch (error) {
        res.json({
            status: true,
            message: 'Something went wrong',
            error,
        });
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderServices.calculateRevenueFromDB();
        res.json({
            message: 'Revenue calculated successfully',
            status: true,
            data: result[0],
        });
    }
    catch (error) {
        res.status(200).json({
            message: 'Something went wrong',
            status: true,
            error,
            stack: error === null || error === void 0 ? void 0 : error.stack,
        });
    }
});
const handleUnknownRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(404).json({
            success: false,
            message: 'Page not found',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.orderControllers = {
    createOrder,
    calculateRevenue,
    getAllOrder,
    handleUnknownRoute,
};

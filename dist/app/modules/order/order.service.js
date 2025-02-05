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
exports.orderServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const app_1 = require("../../../app");
const order_model_1 = __importDefault(require("./order.model"));
const createOrderToDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.create(data);
    return result;
});
const calculateRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = order_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: '$totalPrice',
                    // $sum: {
                    //   $multiply: ['$totalPrice', '$quantity'],
                    // },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1,
            },
        },
    ]);
    return result;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({}).populate('car');
    return result;
});
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const getClientSecret = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentIntent = yield app_1.stripe.paymentIntents.create({
        amount: Math.round((payload === null || payload === void 0 ? void 0 : payload.amount) * 100), // Stripe expects amounts in cents
        currency: 'usd',
        metadata: {
            brand: payload === null || payload === void 0 ? void 0 : payload.brand,
            model: payload === null || payload === void 0 ? void 0 : payload.model,
            category: payload === null || payload === void 0 ? void 0 : payload.category,
            totalPrice: payload === null || payload === void 0 ? void 0 : payload.totalPrice,
        },
    });
    console.log('cl ', paymentIntent.client_secret);
    return paymentIntent.client_secret;
});
const getUserOrder = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ email }).populate('car');
    return result;
});
exports.orderServices = {
    createOrderToDB,
    calculateRevenueFromDB,
    getAllOrdersFromDB,
    updateOrder,
    getClientSecret,
    getUserOrder,
};

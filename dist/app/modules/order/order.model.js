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
const mongoose_1 = require("mongoose");
const car_model_1 = __importDefault(require("../car/car.model"));
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: '{VALUE} is not a valid email address!',
        },
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cars',
        required: [true, 'Car ID is required!'],
        validate: {
            validator: function (value) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield car_model_1.default.exists({ _id: value });
                    return result ? true : false;
                });
            },
            message: 'Referenced car does not exist!',
        },
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required!'],
        min: [1, 'Quantity must be at least 1!'],
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required!'],
        min: [0, 'Total price must be a positive number!'],
    },
    transactionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
        default: 'pending',
    },
}, { timestamps: true });
const OrderModel = (0, mongoose_1.model)('Orders', orderSchema);
exports.default = OrderModel;

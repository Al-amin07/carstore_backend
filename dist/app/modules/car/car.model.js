"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'Year is required'],
        min: [1886, 'Year must be 1886 or later'],
        max: [new Date().getFullYear(), 'Year cannot exceed the current year'],
    },
    category: {
        type: String,
        enum: {
            values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
            message: '{VALUE} is not a valid category',
        },
        required: [true, 'Category is required'],
    },
    image: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be a non-negative number'],
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const CarModel = (0, mongoose_1.model)('Cars', carSchema);
exports.default = CarModel;

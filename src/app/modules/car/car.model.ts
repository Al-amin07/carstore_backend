import { model, Schema } from 'mongoose';
import { Car } from './car.interface';

const carSchema = new Schema<Car>(
  {
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true, // Removes extra spaces
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
      required: [true, 'Stock status is required'],
    },
  },
  { timestamps: true }, // Automatically manages createdAt and updatedAt fields
);

const CarModel = model<Car>('Cars', carSchema);
export default CarModel;

import { Request, Response } from 'express';
import { orderServices } from './order.service';
import CarModel from '../car/car.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const isCarExist = await CarModel.findById(order.car);
    if (!isCarExist) {
      return res.json({
        message: 'Something went wrong',
        status: false,
        error: {
          message: 'Car not found!!!',
        },
      });
    }
    if (!isCarExist.inStock) {
      return res.json({
        message: 'Something went wrong',
        status: false,
        error: {
          message: 'Car is not in stock!!!',
        },
      });
    }
    if (isCarExist.quantity < order.quantity) {
      return res.json({
        message: 'Something went wrong',
        status: false,
        error: {
          message: `Insufficient Car! ${isCarExist.quantity} cars are available`,
        },
      });
    }
    const inStock = isCarExist.quantity - order.quantity > 0;

    const updatedResult = await CarModel.findByIdAndUpdate(
      order.car,
      {
        $set: {
          quantity: isCarExist.quantity - order.quantity,
          inStock,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    const result = await orderServices.createOrderToDB(order);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: 'Something went wrong',
      status: false,
      error,
      stack: error?.stack,
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.calculateRevenueFromDB();
    res.json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result[0],
    });
  } catch (error) {
    res.status(200).json({
      message: 'Something went wrong',
      status: true,
      error,
      stack: error?.stack,
    });
  }
};

export const orderControllers = {
  createOrder,
  calculateRevenue,
};

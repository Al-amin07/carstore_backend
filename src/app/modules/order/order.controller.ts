import { Request, Response } from 'express';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await orderServices.createOrderToDB(order);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      message: 'Something went wrong',
      status: true,
      error,
    });
  }
};

export const orderControllers = {
  createOrder,
};

import { Orders } from './order.interface';
import OrderModel from './order.model';

const createOrderToDB = async (data: Orders) => {
  const result = await OrderModel.create(data);

  return result;
};

const calculateRevenueFromDB = async () => {
  const result = OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$totalPrice', '$quantity'],
          },
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
};

export const orderServices = {
  createOrderToDB,
  calculateRevenueFromDB,
};

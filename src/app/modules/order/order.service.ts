import { Orders } from './order.interface';
import OrderModel from './order.model';

const createOrderToDB = async (data: Orders) => {
  const result = await OrderModel.create(data);
  return result;
};

export const orderServices = {
  createOrderToDB,
};

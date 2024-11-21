import { Types } from 'mongoose';

export type Orders = {
  email: string;
  car: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};

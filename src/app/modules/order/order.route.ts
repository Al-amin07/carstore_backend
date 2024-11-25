import express from 'express';
import { orderControllers } from './order.controller';

const route = express.Router();

route.get('/', (req, res) => {
  res.send('HHHHHHHHHH');
});

route.get('/revenue', orderControllers.calculateRevenue);

route.post('/', orderControllers.createOrder);

export const orderRoute = route;

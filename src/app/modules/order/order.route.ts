import express from 'express';
import { orderControllers } from './order.controller';

const route = express.Router();

route.get('/', orderControllers.getAllOrder);

route.get('/revenue', orderControllers.calculateRevenue);

route.post('/', orderControllers.createOrder);

export const orderRoute = route;

import express from 'express';
import { carControllers } from './car.controller';

const route = express.Router();

route.get('/', carControllers.getAllCars);
route.get('/:carId', carControllers.getSingleCar);
route.delete('/:carId', carControllers.deleteCar);
route.patch('/:carId', carControllers.updateSingleCar);

route.post('/', carControllers.createCar);

export const carRoute = route;

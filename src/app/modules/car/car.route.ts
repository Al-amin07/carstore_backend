import express from 'express';
import { carControllers } from './car.controller';

const route = express.Router();

route.get('/', carControllers.getAllCars);
route.get('/:carId', carControllers.getSingleCar);
route.put('/:carId', carControllers.updateSingleCar);
route.post('/', carControllers.createCar);
route.delete('/:carId', carControllers.deleteCar);

export const carRoute = route;

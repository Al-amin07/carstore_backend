import express, { Request, Response } from 'express';
import cors from 'cors';
import { carRoute } from './app/modules/car/car.route';
import { orderRoute } from './app/modules/order/order.route';
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/cars', carRoute);
app.use('/api/orders', orderRoute);
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Car Store',
  });
});

export default app;

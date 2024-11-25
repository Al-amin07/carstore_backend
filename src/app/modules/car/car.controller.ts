import { Request, Response } from 'express';
import { carServices } from './car.service';

// Create New Car
const createCar = async (req: Request, res: Response) => {
  try {
    const carDetails = req.body;
    const result = await carServices.createCarToDB(carDetails);
    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error,
      stack: error?.stack,
    });
  }
};

// Get All Car
const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await carServices.getAllCarsFromDB();
    res.json({
      status: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Validation failed',
      error,
      stack: error?.stack,
    });
  }
};

// Get Single Car
const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carServices.getSignleCarFromDB(carId);
    res.json({
      status: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Validation failed',
      error,
      stack: error?.stack,
    });
  }
};

// Update a Car
const updateSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const updatedDetails = req.body;
    const result = await carServices.updateSingleCarFromDB(
      carId,
      updatedDetails,
    );
    res.json({
      status: true,
      message: 'Car updated successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Validation failed',
      error: error,
      stack: error?.stack,
    });
  }
};

// Delete A Car
const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carServices.deleteCarFromDB(carId);
    res.json({
      status: true,
      message: 'Car deleted successfully',
      data: {},
    });
  } catch (error) {
    res.json({
      status: false,
      message: 'Validation failed',
      error,
      stack: error?.stack,
    });
  }
};

export const carControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  deleteCar,
  updateSingleCar,
};

import { Request, Response } from 'express';
import { carServices } from './car.service';

// Create New Car
const createCar = async (req: Request, res: Response) => {
  try {
    const { cars: carDetails } = req.body;
    const result = await carServices.createCarToDB(carDetails);
    res.status(200).json({
      success: true,
      message: 'Car created successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// Get All Car
const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await carServices.getAllCarsFromDB();
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// Get Single Car
const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carServices.getSignleCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error,
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
    res.status(200).json({
      success: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};

// Delete A Car
const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carServices.deleteCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Car deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Something went wrong',
      error,
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

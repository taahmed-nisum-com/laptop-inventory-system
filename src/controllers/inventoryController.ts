import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ILaptop, LaptopSchema } from "../models/Laptop";
import logger from "../loggers/logger";
import mongoose from "mongoose";
import { validateRAM, validateScreenSize } from "../utils/validation";

const Laptop = mongoose.model<ILaptop>("Laptop", LaptopSchema);

export const addLaptop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valiadationSchema = Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().positive().required(),
    specs: Joi.object({
      screenSize: Joi.string()
        .regex(/\b(?:14|15\.6|16)(?:-inch|\")?\b/)
        .required(),
      processor: Joi.string().required(),
      ram: Joi.string()
        .regex(/^(8|16|32|64)GB?$/)
        .required(),
      storage: Joi.string()
        .regex(
          /^(40|80|120|240|256|500|512|1|2|3|4)(?:GB)?(?:\s+(?:SSD|HDD))?$/i
        )
        .required(),
    }).required(),
  });

  try {
    const { error, value } = valiadationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Error"});
    }
    // const { error: screenError } = validateScreenSize(
    //   req.body.specs.screenSize
    // );
    // if (screenError) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }
    // validateRAM;
    // const { error: ramError } = validateRAM(req.body.specs.screenSize);
    // if (ramError) {
    //   return res.status(400).json({ error: error.details[0].message });
    // }
    const laptop: ILaptop = value;
    await Laptop.create(laptop);

    res.status(200).json({ message: "Laptop Added", laptop });
  } catch (error) {
    console.error("Error:", error);
    logger.error("Error:", error); // Log the error using Winston
    next(error);
  }
};

export const updateLaptop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const valiadationSchema = Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().positive().required(),
    specs: Joi.object({
      screenSize: Joi.string()
        .regex(/\b(?:14|15\.6|16)(?:-inch|\")?\b/)
        .required(),
      processor: Joi.string().required(),
      ram: Joi.string()
        .regex(/^(8|16|32|64)GB?$/)
        .required(),
      storage: Joi.string()
        .regex(
          /^(40|80|120|240|256|500|512|1|2|3|4)(?:GB)?(?:\s+(?:SSD|HDD))?$/i
        )
        .required(),
    }).required(),
  });

  try {
    const id = req.params.id;
    const { error, value } = valiadationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { error: screenError } = validateScreenSize(
      req.body.specs.screenSize
    );
    if (screenError) {
      return res.status(400).json({ error: error.details[0].message });
    }
    validateRAM;
    const { error: ramError } = validateRAM(req.body.specs.screenSize);
    if (ramError) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, value, {new: true});
    if(!updatedLaptop){
        return res.json(404).json({message: 'Laptop not found'})
    }

    res.status(200).json({ message: "Laptop Updated", updatedLaptop });
  } catch (error) {
    console.error("Error:", error);
    logger.error("Error:", error); // Log the error using Winston
    next(error);
  }
};

export const deleteLaptop = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
    try {
      const id = req.params.id;
      const deletedLaptop = await Laptop.findByIdAndDelete(id);
      if(!deletedLaptop){
          return res.json(404).json({message: 'Laptop not found'})
      }
  
      res.status(200).json({ message: "Laptop Deleted Successfully" });
    } catch (error) {
      console.error("Error:", error);
      logger.error("Error:", error); // Log the error using Winston
      next(error);
    }
};

export const getAllLaptops = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
    try {
      const id = req.params.id;
      const laptops = await Laptop.find();
      res.status(200).json(laptops);
    } catch (error) {
      console.error("Error:", error);
      logger.error("Error:", error); // Log the error using Winston
      next(error);
    }
};

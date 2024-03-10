import { Document, Schema } from "mongoose";

export interface LaptopSpecs {
    screenSize: string;
    processor: string;
    ram?: string;
    storage: string;
  }
  
  export interface ILaptop extends Document {
    brand: string;
    model: string;
    price: number;
    specs: LaptopSpecs;
  }
  
export const LaptopSchema = new Schema<ILaptop>({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  specs: {
    screenSize: { type: String, required: true, },
    processor: { type: String, required: true, },
    ram: { type: String, required: true, },
    storage: { type: String, required: true, },
  },
});
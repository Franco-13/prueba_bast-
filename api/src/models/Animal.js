import mongoose from "mongoose";
import { ANIMAL_TYPES, DEVICE_TYPES } from "../helpers/constants.js";

const animalSchema = new mongoose.Schema(
  {
    _id: { type: String },
    id_senasa: {
      type: String,
      required: true,
      maxlength: 16,
      minlength: 16,
    },
    animal_type: {
      type: String,
      enum: ANIMAL_TYPES,
      required: true,
    },
    animal_weight: {
      type: Number,
      required: true,
    },
    paddock_name: {
      type: String,
      maxlength: 200,
      required: true,
    },
    device_type: {
      type: String,
      enum: DEVICE_TYPES,
      required: true,
    },
    device_number: {
      type: String,
      required: true,
      maxlength: 8,
      minlength: 8,
      unique: true,
      index: true,
    },
  },
  { _id: false }
);

export default mongoose.model("Animal", animalSchema);

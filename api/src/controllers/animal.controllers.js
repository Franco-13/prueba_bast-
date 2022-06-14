import Animal from "../models/Animal.js";
import { DEVICE_TYPES, ANIMAL_TYPES } from "../helpers/constants.js";

export const getAllAnimalsController = () => {
  return Animal.find()
    .then((animals) => {
      return animals;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
};

export const createAnimalController = (data) => {
  const newAnimal = new Animal(data);

  newAnimal._id = data.id_senasa;

  return newAnimal
    .save()
    .then((updatedAnimal) => {
      console.log("RESULT", updatedAnimal);
      return updatedAnimal;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const updateAnimalController = (id, data) => {
  return Animal.findByIdAndUpdate(id, data, { new: true })
    .then((updatedAnimal) => {
      console.log(updatedAnimal);
      return updatedAnimal;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
};

export const deleteAnimalController = (id) => {
  return Animal.findByIdAndDelete(id)
    .then((deletedAnimal) => {
      console.log("DELETED", deletedAnimal);
      return deletedAnimal;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
};

export const getInfoController = () => {
  return { animalTypes: ANIMAL_TYPES, deviceTypes: DEVICE_TYPES };
};

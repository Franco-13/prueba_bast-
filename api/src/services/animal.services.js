import {
  createAnimalController,
  deleteAnimalController,
  getAllAnimalsController,
  updateAnimalController,
  getInfoController,
} from "../controllers/animal.controllers.js";

/* function responseResolver(resolvedData, rejectedData) {
  
} */

export const getAllAnimals = (req, res) => {
  getAllAnimalsController()
    .then((animals) => {
      console.log("GET ANIMALS", animals);
      res.send(animals);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err.message });
    });
};

export const createAnimal = (req, res) => {
  createAnimalController(req.body)
    .then((updatedAnimal) => {
      console.log("CREATE ANIMALS", updatedAnimal);
      res.send(updatedAnimal);
    })
    .catch((e) => {
      res.status(400).json({ message: e.message });
    });
};

export const updateAnimal = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  updateAnimalController(id, data)
    .then((updatedAnimal) => {
      console.log(updatedAnimal);
      res.send(updatedAnimal);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
};

export const deleteAnimal = (req, res) => {
  const { id } = req.params;

  deleteAnimalController(id)
    .then((animalDeleted) => {
      console.log("DELETED", animalDeleted);
      res.send(animalDeleted);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
};

export const getInfo = (req, res) => {
  const info = getInfoController();
  res.send(info);
};

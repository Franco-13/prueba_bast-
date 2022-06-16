import {
  createAnimalController,
  deleteAnimalController,
  getAllAnimalsController,
  updateAnimalController,
  getInfoController,
} from "../controllers/animals.controllers.js";

export const getAllAnimals = (req, res) => {
  getAllAnimalsController()
    .then((animals) => {
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
      res.send(updatedAnimal);
    })
    .catch((error) => {
      console.log("ERROR CREATE IN SERVICE", error);
      res.status(400).json({ message: error.message });
    });
};

export const updateAnimal = (req, res) => {
  const { id } = req.params;

  const data = req.body;

  const { is_admin } = req.user;

  if (!is_admin) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    updateAnimalController(id, data)
      .then((updatedAnimal) => {
        res.send(updatedAnimal);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ message: error.message });
      });
  }
};

export const deleteAnimal = (req, res) => {
  const { id } = req.params;

  const { is_admin } = req.user;

  if (!is_admin) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    deleteAnimalController(id)
      .then((animalDeleted) => {
        res.send(animalDeleted);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ message: error.message });
      });
  }
};

export const getInfo = (req, res) => {
  const info = getInfoController();
  res.send(info);
};

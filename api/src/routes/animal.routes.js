import { Router } from "express";
import {
  createAnimal,
  deleteAnimal,
  getAllAnimals,
  updateAnimal,
  getInfo,
} from "../services/animal.services.js";

const router = Router();

router.get("/", getAllAnimals);

router.get("/info", getInfo);

router.post("/", createAnimal);

router.put("/:id", updateAnimal);

router.delete("/:id", deleteAnimal);

export default router;

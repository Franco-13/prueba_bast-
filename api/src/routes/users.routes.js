import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.post("/", (req, res) => {
  const { uid, email } = req.body;

  const is_admin = email.includes("admin");

  const newUser = new User({
    id_user: uid,
    email,
    is_admin,
  });

  return newUser
    .save()
    .then((createdUser) => {
      res.send(createdUser);
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
});

router.get("/auth", (req, res) => {
  const token = req.headers.authorization;

  User.findOne({ id_user: token })
    .then((response) => {
      if (!response) {
        throw new Error("User does not exist");
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});

export default router;

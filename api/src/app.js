import express from "express";
import morgan from "morgan";
import animalsRoutes from "./routes/animals.routes.js";
import usersRoutes from "./routes/users.routes.js";
import cors from "cors";
import admin from "firebase-admin";
import { readFile } from "fs/promises";

const json = JSON.parse(
  await readFile(new URL("./serviceAccountKey.json", import.meta.url))
);
export const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(json),
});

const server = express();
server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE",
    true
  );
  next();
});

server.use("/animal", animalsRoutes);
server.use("/user", usersRoutes);

export default server;

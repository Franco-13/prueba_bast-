import { config } from "dotenv";
import mongoose from "mongoose";
config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(({ connection }) => {
    console.log(`Mongo ${connection.name} connected!`);
  })
  .catch((error) => {
    console.log("ERROR", error.message);
  });

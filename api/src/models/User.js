import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id_user: { type: String, required: true },
  email: { type: String },
  is_admin: { type: Boolean },
});

export default mongoose.model("User", userSchema);

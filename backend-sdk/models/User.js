import { Schema, model } from "mongoose";

const userSchema = new Schema({
  associationName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rights: {
    type: String,
    required: true,

  },
});

export default model("User", userSchema);

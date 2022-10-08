import { Schema, model } from "mongoose";

const officeBearerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: String,
    required: true,
  },
  deptyos: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model("Club", officeBearerSchema);

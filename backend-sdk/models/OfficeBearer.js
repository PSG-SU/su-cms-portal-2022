import { Schema, model } from "mongoose";

const officeBearerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
  },
  year: {
    type: String,
    required: true,
  },
  deptyos: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

officeBearerSchema.index({ role: 1, year: 1 }, { unique: true });

export default model("OfficeBearer", officeBearerSchema);

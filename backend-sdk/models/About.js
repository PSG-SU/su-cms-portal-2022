import { Schema, model } from "mongoose";

const AboutSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  ourMission: {
    type: String,
    required: true,
  },
  ourPlan: {
    type: String,
    required: true,
  },
  ourVision: {
    type: String,
    required: true,
  },
  aboutCollege: {
    type: String,
    required: true,
  },
  numberOfSchemes: {
    type: Number,
    required: true,
  },
  numberOfWings: {
    type: Number,
    required: true,
  },
});

export default model("About", AboutSchema);

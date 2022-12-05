import { Schema, model } from "mongoose";

const GeneralSchema = new Schema({
  image_url: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default model("General", GeneralSchema);

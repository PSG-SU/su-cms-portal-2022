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
});

export default model("About", AboutSchema);

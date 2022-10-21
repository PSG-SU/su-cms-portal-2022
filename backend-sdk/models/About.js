import { Schema, model } from "mongoose";

const AboutSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
});

export default model("About", AboutSchema);

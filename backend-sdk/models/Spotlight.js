import { Schema, model } from "mongoose";

const SpotlightSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
});

export default model("Spotlight", SpotlightSchema);

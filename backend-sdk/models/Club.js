import { Schema, model } from "mongoose";

const clubSchema = new Schema({
  clubName: {
    type: String,
    required: true,
  },
  clubId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
  },
  image_url: {
    type: String,
  },
});

export default model("Club", clubSchema);

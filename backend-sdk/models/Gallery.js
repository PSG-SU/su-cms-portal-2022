import { Schema, model } from "mongoose";

const GallerySchema = new Schema({
  image_url: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  }
});

export default model("Gallery", GallerySchema);

import { Schema, model } from "mongoose";

const GallerySchema = new Schema({
  image_url: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
});

export default model("ClubGallery", GallerySchema);

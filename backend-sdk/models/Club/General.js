import { Schema, model } from "mongoose";

const GeneralSchema = new Schema({
  image_url: { type: String, },
  user: {
    type: String,
    required: true,
  },
  banner_url: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6UnLX1QG3w_BL0YLXdPvRih6LkJpJpE2c41rF-uEmHiyMaKgkKGka88NsiUrp0lMJ3A&usqp=CAU",
  },
  tagline: {
    type: String,
    default: "No tagline provided",
  },
  description: {
    type: String,
    default: "No description provided",
  },
  contactName1: { type: String, },
  contactName2: { type: String, },
  contactNumber1: { type: String, },
  contactNumber2: { type: String, },
  contactEmail1: { type: String, },
  contactEmail2: { type: String, },
  website: { type: String, },
  instagram: { type: String, },
  linkedin: { type: String, },
  linktree: { type: String, },
  youtube: { type: String, },
  discord: { type: String, },
});

export default model("General", GeneralSchema);

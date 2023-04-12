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
  banner_url: {
    type: String,
    required: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6UnLX1QG3w_BL0YLXdPvRih6LkJpJpE2c41rF-uEmHiyMaKgkKGka88NsiUrp0lMJ3A&usqp=CAU",
  },
  description: {
    type: String,
    default: "No description provided",
    required: true,
  },
  contactName1: {
    type: String,
    required: true,
  },
  contactName2: {
    type: String,
    required: true,
  },
  contactNumber1: {
    type: String,
    required: true,
  },
  contactNumber2: {
    type: String,
    required: true,
  },
  contactEmail1: {
    type: String,
    required: true,
  },
  contactEmail2: {
    type: String,
    required: true,
  },
});

export default model("General", GeneralSchema);

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
  },
  category: {
    type: String,
    required: true,
  },
});

export default model("Club", clubSchema);

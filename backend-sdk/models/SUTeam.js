import { Schema, model } from "mongoose";

const SUTeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model("User", SUTeamSchema);

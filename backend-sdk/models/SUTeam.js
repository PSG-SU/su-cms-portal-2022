import { Schema, model } from "mongoose";

const SUTeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    lowercase: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

export default model("SUTeam", SUTeamSchema);

import { Schema, model } from "mongoose";

const SUTeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  image_url: {
    type: String,
    required: true,
  },
});

export default model("SUTeam", SUTeamSchema);

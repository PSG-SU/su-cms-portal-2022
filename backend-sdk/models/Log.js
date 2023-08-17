import { Schema, model } from "mongoose";

const LogSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    required: false,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

export default model("Log", LogSchema);

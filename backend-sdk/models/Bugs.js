import { Schema, model } from "mongoose";

const bugsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  fileUrls: {
    type: [String],
  },
  status: {
    type: String,
    required: true,
  },
  response: {
    type: String,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

export default model("Bug", bugsSchema);

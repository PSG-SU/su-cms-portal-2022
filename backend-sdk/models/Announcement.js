import { Schema, model } from "mongoose";

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
});

export default model("Announcement", announcementSchema);

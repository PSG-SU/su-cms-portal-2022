import { Schema, model } from "mongoose";

const announcementSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: false,
  },
  type: {
    type:String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default model("Announcement", announcementSchema);

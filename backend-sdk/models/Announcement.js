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
  },
  type: {
    type:String,
  },
  link: {
    type: String,
  },
});

export default model("Announcement", announcementSchema);

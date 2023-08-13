import { Schema, model } from "mongoose";

const EventReportSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

export default model("EventReport", EventReportSchema);

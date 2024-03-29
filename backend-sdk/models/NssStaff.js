import { Schema, model } from "mongoose";

const nssStaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scheme: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});

// nssStaffSchema.index({ club: 1, priority: 1 }, { unique: true });

export default model("NssStaff", nssStaffSchema);

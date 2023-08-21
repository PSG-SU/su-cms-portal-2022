import { Schema, model } from 'mongoose';

const TeamMemberSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  year: {
    type: String,
  },
  image_url: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  user: {
    type: String,
    required: true,
  },
});

export default model("TeamMember", TeamMemberSchema);

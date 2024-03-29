import { Schema, model } from "mongoose";

const ProposalSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
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
  guest: {
    type: String,
  },
  expectedExpense: {
    type: Number,
    required: true,
  },
  allocatedBudget: {
    type: Number,
    required: true,
  },
  amountSpent: {
    type: Number,
    required: true,
  },
  inCollab: {
    type: String,
    required: true,
  },
  orgName: {
    type: String,
  },
  budgetSplit: {
    type: String,
  },
  facultyName: {
    type: String,
    required: true,
  },
  facultyDept: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "facApproved", "deanApproved", "rejected", "published", "approvalVerification"],
    default: "pending",
  },
  fileURLs: {
    type: [String],
  },
  images: {
    type: [String],
  },
  approvalForm: {
    type: String,
  },
  registrationLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  publishedAt: {
    type: Date,
  },
  user: {
    type: String,
    required: true,
  },
});

export default model("Proposal", ProposalSchema);

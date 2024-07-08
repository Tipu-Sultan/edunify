import mongoose from "mongoose";
import { object } from "zod";

const schoolSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },    
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: 'a',
  },

  publicUrl: {
    type: String,
    required: true,
    default: 'a',
  },
  path: {
    type: String,
    required: true,
    default: 'p',
  },

});

mongoose.models = {};

export const School = mongoose.model("School", schoolSchema);

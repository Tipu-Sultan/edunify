import mongoose from 'mongoose';

const EdunifyUsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null, // Null for Google users
  },
  image: {
    type: String,
    default: null, // Profile picture from Google
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    enum: ['NORMAL', 'SUPERADMIN', 'SCHOOLADMIN'],
    default: 'NORMAL',
  },
  permissions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on save
EdunifyUsersSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const EdunifyUsers =  mongoose.models.EdunifyUser || mongoose.model('EdunifyUser', EdunifyUsersSchema);
export default EdunifyUsers
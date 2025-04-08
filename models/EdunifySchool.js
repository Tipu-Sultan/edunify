import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  slug: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: "India" },
    coordinates: { latitude: { type: Number }, longitude: { type: Number } },
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
  },
  board: {
    type: String,
    enum: ["CBSE", "ICSE", "IB", "State", "Other"],
    required: true,
    index: true,
  },
  educationLevels: {
    type: [String],
    enum: ["Pre-Primary", "Primary", "Middle", "Secondary", "Senior Secondary"],
    required: true,
    index: true,
  },
  medium: {
    type: [String],
    enum: ["English", "Hindi", "Regional", "Other"],
    required: true,
  },
  fees: {
    annualFee: { type: Number, required: true },
    admissionFee: { type: Number },
    otherFees: [{ name: { type: String }, amount: { type: Number } }],
  },
  facilities: { type: [String], default: [] },
  extracurriculars: { type: [String], default: [] },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  faculty: [
    {
      name: { type: String, required: true },
      subject: { type: String },
      qualification: { type: String },
      experience: { type: String },
    },
  ],
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "EdunifyUsers" },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  admissionStatus: {
    type: String,
    enum: ["Open", "Closed", "Upcoming"],
    default: "Closed",
  },
  admissionProcess: { type: String },
  establishedYear: { type: Number },
  schoolType: {
    type: String,
    enum: ["Public", "Private", "International", "Boarding", "Day"],
    required: true,
    index: true,
  },
  gender: {
    type: String,
    enum: ["Co-ed", "Boys", "Girls"],
    required: true,
    index: true,
  },
  capacity: {
    totalStudents: { type: Number },
    availableSeats: { type: Number },
  },
  accreditations: { type: [String], default: [] },
  achievements: [
    {
      title: { type: String },
      year: { type: Number },
      description: { type: String },
    },
  ],
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EdunifyUsers",
    required: true,
  }, // Track who created the school
});

// Middleware to update `updatedAt`
SchoolSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for geospatial queries (if using coordinates)
SchoolSchema.index({ "address.coordinates": "2dsphere" });

const EdunifySchool =
  mongoose.models.EdunifySchool ||
  mongoose.model("EdunifySchool", SchoolSchema);
export default EdunifySchool;

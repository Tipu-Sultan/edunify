import mongoose from 'mongoose';

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true, // For search/filter by name
  },
  slug: {
    type: String,
    unique: true,
    required: true, // e.g., "dps-delhi" for URL-friendly access
  },
  description: {
    type: String,
    required: true, // Brief overview of the school
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true, index: true }, // For location-based search
    state: { type: String, required: true, index: true },
    postalCode: { type: String, required: true },
    country: { type: String, default: 'India' },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    }, // For map integration
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
  },
  board: {
    type: String,
    enum: ['CBSE', 'ICSE', 'IB', 'State', 'Other'],
    required: true,
    index: true, // For filtering by board
  },
  educationLevels: {
    type: [String],
    enum: ['Pre-Primary', 'Primary', 'Middle', 'Secondary', 'Senior Secondary'],
    required: true,
    index: true, // For filtering by level
  },
  medium: {
    type: [String],
    enum: ['English', 'Hindi', 'Regional', 'Other'],
    required: true, // Language of instruction
  },
  fees: {
    annualFee: { type: Number, required: true }, // In INR
    admissionFee: { type: Number },
    otherFees: [{
      name: { type: String }, // e.g., "Transport", "Uniform"
      amount: { type: Number },
    }],
  },
  facilities: {
    type: [String],
    default: [],
    // Examples: "Library", "Science Lab", "Sports Ground", "Smart Classrooms"
  },
  extracurriculars: {
    type: [String],
    default: [],
    // Examples: "Football", "Music", "Debate", "Robotics"
  },
  images: {
    type: [String],
    default: [],
    // URLs to school photos (e.g., from Cloudinary or local storage)
  },
  faculty: [{
    name: { type: String, required: true },
    subject: { type: String },
    qualification: { type: String },
    experience: { type: String }, // e.g., "10 years"
  }],
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'EdunifyUsers' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  admissionStatus: {
    type: String,
    enum: ['Open', 'Closed', 'Upcoming'],
    default: 'Closed',
  },
  admissionProcess: {
    type: String,
    // Description of how to apply
  },
  establishedYear: {
    type: Number,
    // For historical context
  },
  schoolType: {
    type: String,
    enum: ['Public', 'Private', 'International', 'Boarding', 'Day'],
    required: true,
    index: true, // For filtering by type
  },
  gender: {
    type: String,
    enum: ['Co-ed', 'Boys', 'Girls'],
    required: true,
    index: true, // For filtering by gender
  },
  capacity: {
    totalStudents: { type: Number },
    availableSeats: { type: Number },
  },
  accreditations: {
    type: [String],
    default: [],
    // e.g., "ISO Certified", "NAAC Accredited"
  },
  achievements: [{
    title: { type: String },
    year: { type: Number },
    description: { type: String },
  }],
  isVerified: {
    type: Boolean,
    default: false, // Verified by Edunify team
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

// Middleware to update `updatedAt`
SchoolSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for geospatial queries (if using coordinates)
SchoolSchema.index({ 'address.coordinates': '2dsphere' });

const EdunifySchool = mongoose.models.EdunifySchool || mongoose.model('EdunifySchool', SchoolSchema);
export default EdunifySchool;
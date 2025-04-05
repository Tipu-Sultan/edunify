import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }
  await mongoose.connect('mongodb://127.0.0.1:27017/edunify');
  console.log('Connected to MongoDB');
};

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

const EdunifyUsers =  mongoose.models.EdunifyUsers || mongoose.model('EdunifyUsers', EdunifyUsersSchema);

async function seed() {
  await connectDB();

  const users = [
    {
      email: 'admin@edunify.com',
      name: 'Super Admin',
      password: await bcrypt.hash('admin123', 10),
      isAdmin: true,
      userType: 'SUPERADMIN',
      permissions: ['manage_schools', 'manage_users', 'view_reports'],
    },
    {
      email: 'school@dps.com',
      name: 'School Admin',
      password: await bcrypt.hash('school123', 10),
      isAdmin: true,
      userType: 'SCHOOLADMIN',
      permissions: ['manage_school', 'view_students'],
    },
    {
      email: 'parent@gmail.com',
      name: 'Parent User',
      password: await bcrypt.hash('parent123', 10),
      userType: 'NORMAL',
      permissions: ['view_schools', 'apply'],
    },
  ];

  await EdunifyUsers.deleteMany({});
  await EdunifyUsers.insertMany(users);

  console.log('Demo users seeded');
  mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
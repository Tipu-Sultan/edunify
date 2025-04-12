import EdunifySchool from "@/models/EdunifySchool";
import connectDB from "../connectDB";

export async function getSchools() {
  await connectDB();
  const schools = await EdunifySchool.find({})
    .select('name slug board educationLevels extracurriculars images reviews address.city address.state')
    .sort({ createdAt: -1 });

  return schools.map(school => ({
    id: school._id.toString(), // Convert ObjectId to string
    name: school.name,
    slug: school.slug,
    location: {
      city: school.address.city,
      state: school.address.state,
    },
    board: school.board,
    educationLevel: school.educationLevels, // Rename to match SchoolList prop
    extracurriculars: school.extracurriculars,
    images: school.images,
    reviews: school.reviews.length > 0 ? [{ rating: school.reviews[0].rating }] : [], // Only include the first review's rating if it exists
  }));
}

export async function getSchoolBySlug(slug) {
  await connectDB();
  const school = await EdunifySchool.findOne({ slug })
    .select(
      'name slug board educationLevels extracurriculars facilities images reviews address.city address.state contact.phone fees.annualFee medium faculty admissionStatus'
    );

  if (!school) {
    return null; // Return null if no school is found
  }

  // Convert Mongoose document to plain object and ensure all fields are simple values
  return {
    id: school._id.toString(), // Convert ObjectId to string
    name: school.name,
    slug: school.slug,
    location: {
      city: school.address.city,
      state: school.address.state,
    },
    board: school.board,
    educationLevel: school.educationLevels, // Match SchoolDetail prop
    extracurriculars: school.extracurriculars,
    amenities: school.facilities, // Match SchoolDetail prop (assuming 'amenities' refers to 'facilities')
    images: school.images,
    reviews: school.reviews.map((review) => ({
      id: review._id.toString(), // Convert ObjectId to string
      rating: review.rating,
      comment: review.comment || "", // Ensure comment is a string
      user: review.userId ? review.userId.toString() : "Anonymous", // Convert userId to string or default
    })),
    fee: school.fees.annualFee.toString(), // Convert to string for display
    medium: school.medium.join(", "), // Join array into a string
    teachers: school.faculty.map((teacher) => ({
      id: teacher._id.toString(), // Convert ObjectId to string
      name: teacher.name,
      subject: teacher.subject || "N/A",
      qualification: teacher.qualification || "N/A",
      experience: teacher.experience || "N/A",
    })),
    admissionStatus: school.admissionStatus,
  };
}
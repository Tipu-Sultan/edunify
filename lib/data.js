export const schools = [
  {
    id: 1,
    name: "Delhi Public School",
    board: "CBSE",
    fee: "₹150,000/year",
    medium: "English",
    extracurriculars: ["Sports", "Music", "Dance", "Debate"],
    educationLevel: ["Primary", "Secondary", "Higher Secondary"],
    location: {
      city: "Delhi",
      state: "Delhi",
      address: "Mathura Road, New Delhi"
    },
    amenities: ["Swimming Pool", "Smart Classes", "Labs", "Sports Ground"],
    teachers: [
      {
        id: 1,
        name: "Dr. Priya Singh",
        subject: "Science",
        qualification: "Ph.D in Physics",
        experience: "15 years"
      },
      {
        id: 2,
        name: "Mr. Rajesh Kumar",
        subject: "Mathematics",
        qualification: "M.Sc Mathematics",
        experience: "12 years"
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Parent",
        rating: 4.5,
        comment: "Excellent infrastructure and teaching staff"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
    ],
    videos: ["https://example.com/school-video1.mp4"]
  },
  {
    id: 2,
    name: "St. Mary's Convent",
    board: "ICSE",
    fee: "₹180,000/year",
    medium: "English",
    extracurriculars: ["Music", "Art", "Theatre"],
    educationLevel: ["Primary", "Secondary"],
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      address: "Bandra West, Mumbai"
    },
    amenities: ["Library", "Computer Lab", "Auditorium"],
    teachers: [
      {
        id: 1,
        name: "Ms. Sarah D'souza",
        subject: "English",
        qualification: "M.A. English Literature",
        experience: "10 years"
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Parent",
        rating: 4.8,
        comment: "Great academic focus and values"
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
    ],
    videos: ["https://example.com/school-video2.mp4"]
  }
];

export const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@edunify.com",
    role: "superadmin",
    password: "admin123"
  },
  {
    id: 2,
    name: "School Admin",
    email: "school@dps.com",
    role: "schooladmin",
    password: "school123"
  },
  {
    id: 3,
    name: "Parent User",
    email: "parent@gmail.com",
    role: "user",
    password: "parent123"
  }
];
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

export const colleges = [
  {
    "name": "Springfield Public School",
    "slug": "springfield-public-school-lucknow",
    "description": "A well-established CBSE school in the heart of Lucknow.",
    "address": {
      "street": "Gomti Nagar Extension",
      "city": "Lucknow",
      "state": "Uttar Pradesh",
      "postalCode": "226010",
      "country": "India",
      "coordinates": { "latitude": 26.8467, "longitude": 80.9462 }
    },
    "contact": {
      "phone": "+91-9876543210",
      "email": "info@springfieldlucknow.edu.in",
      "website": "https://springfieldlucknow.edu.in"
    },
    "board": "CBSE",
    "educationLevels": ["Primary", "Middle", "Secondary"],
    "medium": ["English"],
    "fees": {
      "annualFee": 50000,
      "admissionFee": 10000,
      "otherFees": [
        { "name": "Transport", "amount": 8000 },
        { "name": "Uniform", "amount": 3000 }
      ]
    },
    "facilities": ["Library", "Playground", "Smart Classes", "Transport"],
    "extracurriculars": ["Dance", "Music", "Sports", "Drama"],
    "images": ["springfield1.jpg", "springfield2.jpg"],
    "faculty": [
      { "name": "Neha Sharma", "subject": "Mathematics", "qualification": "M.Sc., B.Ed.", "experience": "8 years" }
    ],
    "reviews": [],
    "averageRating": 0,
    "admissionStatus": "Open",
    "admissionProcess": "Online registration followed by interaction.",
    "establishedYear": 2005,
    "schoolType": "Private",
    "gender": "Co-ed",
    "capacity": { "totalStudents": 1500, "availableSeats": 100 },
    "accreditations": ["ISO 9001"],
    "achievements": [{ "title": "Best School in Lucknow", "year": 2021, "description": "Awarded by Education Board" }],
    "isVerified": true,
    "createdAt": "2024-01-10T00:00:00.000Z",
    "updatedAt": "2025-04-06T00:00:00.000Z",
    "createdBy": "66293fb17736dacf004b1180"
  },
  {
    "name": "Delhi International School",
    "slug": "delhi-international-school-delhi",
    "description": "A prestigious IB and CBSE school located in South Delhi.",
    "address": {
      "street": "Vasant Kunj",
      "city": "Delhi",
      "state": "Delhi",
      "postalCode": "110070",
      "country": "India",
      "coordinates": { "latitude": 28.5206, "longitude": 77.1557 }
    },
    "contact": {
      "phone": "+91-9123456780",
      "email": "contact@disdelhi.in",
      "website": "https://disdelhi.in"
    },
    "board": "IB",
    "educationLevels": ["Pre-Primary", "Primary", "Middle", "Secondary", "Senior Secondary"],
    "medium": ["English", "Hindi"],
    "fees": {
      "annualFee": 120000,
      "admissionFee": 25000,
      "otherFees": [{ "name": "Lab Fee", "amount": 5000 }]
    },
    "facilities": ["Auditorium", "Cafeteria", "Library", "Science Labs"],
    "extracurriculars": ["Robotics", "Model UN", "Sports"],
    "images": ["dis1.jpg"],
    "faculty": [
      { "name": "Rahul Mehta", "subject": "Physics", "qualification": "Ph.D., B.Ed.", "experience": "10 years" }
    ],
    "reviews": [],
    "averageRating": 0,
    "admissionStatus": "Upcoming",
    "admissionProcess": "Entrance test followed by interview.",
    "establishedYear": 1998,
    "schoolType": "International",
    "gender": "Co-ed",
    "capacity": { "totalStudents": 2000, "availableSeats": 200 },
    "accreditations": ["IB Certified"],
    "achievements": [{ "title": "National Debate Winner", "year": 2022, "description": "Won national debate championship." }],
    "isVerified": true,
    "createdAt": "2024-03-15T00:00:00.000Z",
    "updatedAt": "2025-04-06T00:00:00.000Z",
    "createdBy": "66293fb17736dacf004b1180"
  },
  {
    "name": "St. Xavier's High School",
    "slug": "st-xaviers-high-school-mumbai",
    "description": "A historic and reputed school in Mumbai offering ICSE curriculum.",
    "address": {
      "street": "Marine Lines",
      "city": "Mumbai",
      "state": "Maharashtra",
      "postalCode": "400002",
      "country": "India",
      "coordinates": { "latitude": 18.9440, "longitude": 72.8234 }
    },
    "contact": {
      "phone": "+91-9001234567",
      "email": "admin@stxaviersmumbai.org",
      "website": "https://stxaviersmumbai.org"
    },
    "board": "ICSE",
    "educationLevels": ["Primary", "Middle", "Secondary", "Senior Secondary"],
    "medium": ["English"],
    "fees": {
      "annualFee": 70000,
      "admissionFee": 15000,
      "otherFees": []
    },
    "facilities": ["Playground", "Computer Lab", "Library"],
    "extracurriculars": ["Football", "Cricket", "Chess", "Art"],
    "images": ["xaviers1.jpg", "xaviers2.jpg"],
    "faculty": [
      { "name": "Anjali Kapoor", "subject": "English", "qualification": "M.A., B.Ed.", "experience": "12 years" }
    ],
    "reviews": [],
    "averageRating": 0,
    "admissionStatus": "Closed",
    "admissionProcess": "Offline registration with documents submission.",
    "establishedYear": 1965,
    "schoolType": "Public",
    "gender": "Boys",
    "capacity": { "totalStudents": 1000, "availableSeats": 0 },
    "accreditations": [],
    "achievements": [{ "title": "State Cricket Champion", "year": 2019, "description": "Won inter-school state championship." }],
    "isVerified": true,
    "createdAt": "2023-12-05T00:00:00.000Z",
    "updatedAt": "2025-04-06T00:00:00.000Z",
    "createdBy": "66293fb17736dacf004b1180"
  }
  
]
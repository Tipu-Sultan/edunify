export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">About Edunify</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">
          Edunify is a comprehensive platform designed to help parents find the best schools
          for their children across India. We understand that choosing the right school is
          one of the most important decisions parents make for their children's future.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          To provide transparent, accurate, and detailed information about schools,
          enabling parents to make informed decisions about their children's education.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Comprehensive school listings across India</li>
          <li>Detailed information about facilities and faculty</li>
          <li>Parent reviews and ratings</li>
          <li>Easy application process</li>
          <li>Direct communication with school administrators</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">For Schools</h2>
        <p className="mb-6">
          We provide schools with a platform to showcase their facilities, achievements,
          and unique offerings to potential parents. Schools can manage their profiles,
          respond to inquiries, and handle applications through our admin dashboard.
        </p>
      </div>
    </div>
  );
}
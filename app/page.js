import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our School Web App</h1>
        <p className="text-lg mb-8">Discover and manage information about schools effortlessly.</p>
        <Link href={'/addschools'}>
        <button className="bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white py-2 px-4 rounded-full font-bold transition duration-300">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default page;

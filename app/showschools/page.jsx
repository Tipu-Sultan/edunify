'use client'
// pages/schools.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('https://mancode.onrender.com/api/getschool');
        if (response.status === 200) {
          setSchools(response.data);
        } else {
          console.error('Failed to fetch schools:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching schools:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <div className='flex items-center justify-center'>
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
        </div>
      ) : schools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {schools.map((school) => <SchoolCard key={school.id} school={school} />)}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-bold mb-4">Oops! No schools available.</p>
          {/* You can add additional content or suggestions here */}
        </div>
      )}
    </div>
  );
};

const SchoolCard = ({ school }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 delay-150">
      <div className="mb-4 relative overflow-hidden">
        <img
          src={`https://mancode.onrender.com/uploads/${school.image}`}
          alt={school.name}
          className="w-full h-32 object-cover rounded-md transform scale-100 hover:scale-110 transition-transform delay-150"
        />
      </div>
      <h2 className="text-xl font-bold mb-2">{school.name}</h2>
      <p className="text-gray-600 mb-2">{school.address}, {school.city},</p>
      <p className="text-gray-600 mb-2">State: {school.state}</p>
      <button className="bg-indigo-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300">
        Apply Now
      </button>
    </div>
  );
};

export default Schools;


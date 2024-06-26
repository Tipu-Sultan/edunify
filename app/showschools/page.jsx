'use client'
// pages/schools.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const page = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/getschool');
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
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
            <p className="text-gray-600 absolute bottom-0 mb-4 w-full text-center font-bold">
              Please wait a couple of minutes.
            </p>
          </div>
        </div>
      ) : schools.length > 0 ? (
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {schools.map((school, i) => (
              <SchoolCard key={i} school={school} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-red-500 font-bold text-center">
            Oops! Schools are not available at the moment.
          </p>
        </div>
      )}
    </>

  );


};

const SchoolCard = ({ school }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 delay-150">
      <div className="mb-4 relative overflow-hidden">
        <img
          src={`${school.publicUrl}`}
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




export default page;

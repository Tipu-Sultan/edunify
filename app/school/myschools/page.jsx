'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SearchPanel from '../../../components/SearchPanel';
const page = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/school/allschools');
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

  const handleDeleteSchool = async (id) => {
    try {
      const response = await axios.delete(`/api/allschools?id=${id}`);

      if (response.status === 200) {
        // Update schools state by filtering out the deleted school
        setSchools(schools.filter(school => school._id !== id));

        // Show success toast
        toast.success('School deleted successfully');
      } else {
        console.error('Failed to delete school:', response.statusText);
        // Show error toast
        toast.error('Failed to delete school');
      }
    } catch (error) {
      console.error('Error deleting school:', error.message);
      // Show error toast
      toast.error('Error deleting school');
    }
  };

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <>
      <SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
            <p className="text-gray-600 absolute bottom-0 mb-4 w-full text-center font-bold">
              Please wait a couple of minutes.
            </p>
          </div>
        </div>
      ) : filteredSchools.length > 0 ? (
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSchools.map((school, i) => (
              <SchoolCard key={i} school={school} onDelete={() => handleDeleteSchool(school._id)} />
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

const SchoolCard = ({ school, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 delay-150">
      <h2 className="text-xl font-bold mb-2">{school.name}</h2>
      <p className="text-gray-600 mb-2">{school.address}, {school.city},</p>
      <p className="text-gray-600 mb-2">State: {school.state}</p>
      <button onClick={onDelete} className="bg-indigo-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300">
        Delete Now
      </button>
    </div>
  );
};




export default page;

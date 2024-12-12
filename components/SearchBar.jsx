import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-bold text-center mb-4 text-indigo-600">Find Your Ideal School</h3>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-indigo-500"
            placeholder="Search schools"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
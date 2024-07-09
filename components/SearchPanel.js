import React from 'react';

const SearchPanel = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-indigo-600">Find Your Ideal School</h1>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-indigo-500"
            placeholder="Search by name, city, or address"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;

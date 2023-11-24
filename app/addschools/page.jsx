'use client'
import React, { useState } from 'react';

const page = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add API endpoint for data submission
    // For example, you can use the fetch API or axios
    const apiUrl = '/api/addschool';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data submitted successfully:', data);
        // You can perform additional actions after successful submission
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        // Handle errors accordingly
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          Add New School
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
             School Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
             School Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
             School City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;

"use client";
import React, { useState } from 'react';

const AddSchoolForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    email: '',
    picture: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const validateContact = (contact) => /^[0-9]{10}$/.test(contact);

  const validateEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const validateFileType = (file) => {
    const allowedFileTypes = ['.jpg', '.jpeg', '.png'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedFileTypes.includes(`.${fileExtension}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data here if needed
    if (
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !validateContact(formData.contact) ||
      !validateEmail(formData.email) ||
      (formData.picture && !validateFileType(formData.picture))
    ) {
      alert('Please fill in all the required fields and provide valid data.');
      return;
    }

    // Simulate loading
    setLoading(true);

    // Your API request code goes here
    try {
      // Example using fetch
      const apiUrl = '/api/addschool';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: new FormData(e.target),
      });

      const data = await response.json();
      console.log('Data submitted successfully:', data);

      // Reset the form after successful submission
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        contact: '',
        email: '',
        picture: null,
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-md flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg max-w-6xl w-full shadow-blue">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Add New School
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          
          {/* School Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              School Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
            />
          </div>

          {/* ... (other form fields) ... */}
          <div className="mb-4">
            <label
              htmlFor="addrees"
              className="block text-sm font-medium text-gray-600"
            >
              School Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              School city
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              School state
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-600"
            >
              School contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              School email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md border-gray-300 focus:border-indigo-500"
            />
          </div>

          {/* Image Upload (File Input) */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Add School Image
            </label>
            <input
              type="file"
              name="picture"
              onChange={handleChange}
              accept=".jpg, .jpeg, .png"
            />
          </div>

          {/* ... (other form fields) ... */}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
              disabled={loading}
            >
              {loading ? 'Please wait' : 'Add School'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;


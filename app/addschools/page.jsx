import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    contact: '',
    email: '',
    picture: null,  // Use null for the file input
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // For file input, use e.target.files
    const inputValue = type === 'file' ? e.target.files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    for (const key in formData) {
      formDataObject.append(key, formData[key]);
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/addschool", formDataObject);

      if (response.status === 201) {
        const result = response.data;
        console.log("Data submitted successfully:", result.data);
        toast.success(result.data.message);
      } else {
        console.error("Failed to submit data:", response.statusText);
        toast.error("Failed to submit data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-md flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg  max-w-6xl w-full shadow-blue">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Add New School
        </h1>
        <form onSubmit={onSubmit} encType="multipart/form-data">
          {/* School Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              School Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`mt-1 p-2 w-full border rounded-md`}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              School Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={`mt-1 p-2 w-full border rounded-md `}
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              School City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={`mt-1 p-2 w-full border rounded-md `}
              value={formData.city}
              onChange={handleChange}
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              School State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className={`mt-1 p-2 w-full border rounded-md `}
              value={formData.state}
              onChange={handleChange}
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              School Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className={`mt-1 p-2 w-full border rounded-md `}
              value={formData.contact}
              onChange={handleChange}
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              School City
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md `}
              value={formData.email}
              onChange={handleChange}
            />
            
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              School Image
            </label>
            <input
              type="file"
              id="picture"
              name="picture"
              className={`mt-1 p-2 w-full border rounded-md `}
              value={formData.picture}
              onChange={handleChange}
            />
            
          </div>

          {/* ... Other form fields ... */}
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
            >
              {loading ? "Please wait" : "Add School"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

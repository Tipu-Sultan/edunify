'use client'
import React, { useState } from "react";
import { toast } from "react-toastify";
const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email: "",
    file: null,
  });
  const [wait, setWait] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Validation functions
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidContact = (contact) => /^[0-9]{10}$/.test(contact);
    const isValidImage = (file) => {
      if (!file) return true; // No file selected is considered valid
      const allowedFileTypes = [".jpg", ".jpeg", ".png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      return allowedFileTypes.includes(`.${fileExtension}`);
    };

    // Validation check based on the input name
    let isValidInput = true;
    if (name === "email") {
      isValidInput = isValidEmail(value);
    } else if (name === "contact") {
      isValidInput = isValidContact(value);
    } else if (name === "file") {
      isValidInput = isValidImage(files[0]);
    }

    // Update form data only if the input is valid
    if (isValidInput) {
      setFormData({
        ...formData,
        [name]: type === "file" ? files[0] : value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);

    const apiUrl = "https://mancode.onrender.com/api/addschool";

    const formDataWithImage = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataWithImage.append(key, value);
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formDataWithImage,
      });

      if (!response.ok) {
        throw new Error(`Failed to submit data. Status: ${response.status}`);
      }

      const data = await response.json();
      setWait(false);
      toast.success("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error.message);
      setWait(false);
      toast.error("Failed to submit data");
    }
  };
  return (
    <div className="min-h-md flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg  max-w-6xl w-full shadow-blue">
        <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Add New School
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              School State:
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-600"
            >
              Contact:
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-600"
            >
              School Picture:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleInputChange}
              accept=".jpg, .jpeg, .png"
            />
          </div>

          {/* Validation messages */}
          {formData.email && !isValidEmail(formData.email) && (
            <p className="text-red-500 mt-1">Invalid email address</p>
          )}
          {formData.contact && !isValidContact(formData.contact) && (
            <p className="text-red-500 mt-1">
              Invalid contact number. Please enter a 10-digit number.
            </p>
          )}
          {formData.file && !isValidImage(formData.file) && (
            <p className="text-red-500 mt-1">
              Invalid image type. Only JPG, JPEG, and PNG are allowed.
            </p>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
              disabled={wait}
            >
              {wait ? "Please wait" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

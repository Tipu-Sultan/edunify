"use client";
//
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from 'axios';

const page = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      city: '',
      state: '',
      contact: '',
      email: '',
      file: '',
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email", data.email);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch("/api/school/addschool", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.error || "An unexpected error occurred");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data. Please try again.");
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
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
              className={`mt-1 p-2 w-full border rounded-md ${errors.name
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500"
                }`}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={`mt-1 p-2 w-full border rounded-md ${errors.address
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500"
                }`}
              {...register("address", { required: true })}
            />
            {errors.address && (
              <p className="text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* City */}
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className={`mt-1 p-2 w-full border rounded-md ${errors.city
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500"
                }`}
              {...register("city", { required: true })}
            />
            {errors.city && (
              <p className="text-red-500 mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className={`mt-1 p-2 w-full border rounded-md ${errors.state
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500"
                }`}
              {...register("state", { required: true })}
            />
            {errors.state && (
              <p className="text-red-500 mt-1">{errors.state.message}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-600"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className={`mt-1 p-2 w-full border rounded-md ${errors.contact
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500"
                }`}
              {...register("contact", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message:
                    "Invalid contact number. Please enter a 10-digit number.",
                },
              })}
            />
            {errors.contact && (
              <p className="text-red-500 mt-1">{errors.contact.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border rounded-md ${errors.email
                ? "border-red-500"
                : "border-gray-300 focus:border-indigo-500"
                }`}
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Image Upload (File Input) */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-600"
            >
              Add School Image
            </label>
            <input
              type="file"
              {...register("file", {
                required: "Image is required",
                validate: {
                  validFileType: (value) => {
                    const allowedFileTypes = [".jpg", ".jpeg", ".png"];
                    const fileExtension = value[0].name
                      .split(".")
                      .pop()
                      .toLowerCase();
                    return allowedFileTypes.includes(`.${fileExtension}`);
                  },
                },
              })}
              accept=".jpg, .jpeg, .png"
            />
            {errors.file && (
              <p className="text-red-500 mt-1">{errors.file.message}</p>
            )}
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
            disabled={loading}
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 rounded-full font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0-3.042-1.135-5.824-3-7.938l-3 2.647A7.962 7.962 0 0116 12h4zm-6 7.938V19h-4v1.938A7.962 7.962 0 0112 20h4zM7 4.062L4 6.709V9h4V4.062H7z"
                  ></path>
                </svg>
              ) : (
                'Add School'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;

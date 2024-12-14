'use client';

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { University, MapPin, Phone, Mail, Image as ImageIcon } from "lucide-react";
import toast from 'react-hot-toast';


export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== "image") {
        formData.append(key, data[key]);
      }
    });

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/schools/index", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === 201) {
        toast.success(response.data.message || "School added successfully!");
        reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to add school");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl my-5 mx-auto p-6 border shadow-lg rounded-lg bg-white">

      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Add School
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="relative">
              <University className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                {...register("name", { required: "School name is required" })}
                placeholder="School Name"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-sm text-red-500 mt-1">{errors.name?.message}</p>
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                {...register("address", { required: "Address is required" })}
                placeholder="Address"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-sm text-red-500 mt-1">{errors.address?.message}</p>
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                {...register("city", { required: "City is required" })}
                placeholder="City"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-sm text-red-500 mt-1">{errors.city?.message}</p>
          </div>

          <div>
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                {...register("state", { required: "State is required" })}
                placeholder="State"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-sm text-red-500 mt-1">{errors.state?.message}</p>
          </div>

          <div>
            <div className="relative">
              <Phone className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                {...register("contact", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message:
                      "Invalid contact number. Please enter a 10-digit number.",
                  },
                  required: "Contact is required"
                }
                )}
                placeholder="Contact Number"
                type="number"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-sm text-red-500 mt-1">{errors.contact?.message}</p>
          </div>

          <div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                {...register("email_id", {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid email address",
                  },
                  required: "Email is required"
                })}
                placeholder="Email"
                type="email"
                className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <p className="text-sm text-red-500 mt-1">{errors.email_id?.message}</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Upload School Image</label>
            <div className="relative">
              <ImageIcon className="absolute top-3 left-3 text-gray-400" size={20} />
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                className="block  pl-10 text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-lg file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
              <p className="text-sm text-red-500 mt-1">Image size must be less than 500KB.</p>
            </div>
            <p className="text-sm text-red-500 mt-1">{errors.image?.message}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {loading ? "Submitting..." : "Add School"}
          </button>
        </div>
      </form>
    </div>
  );
}

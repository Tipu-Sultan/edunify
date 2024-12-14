'use client'
import React from "react";
import toast from 'react-hot-toast';
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

const Manage = () => {
    const { data, error, isLoading } = useSWR('/api/schools/index', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const schools = data?.schools || [];


    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/schools/index/${id}`);
            if (res.data.status = 200) {
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.success(error.response.data.error)
        }
    };

    const handleEdit = (id) => {
        console.log("Delete school with ID:", id);
        // Add your delete logic here
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <h1 className="text-2xl font-bold mb-4">Manage Schools</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Slug</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Address</th>
                            <th className="border border-gray-300 px-4 py-2">City</th>
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools.map((school) => (
                            <tr key={school.id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-center">{school.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{school.slug}</td>
                                <td className="border border-gray-300 px-4 py-2">{school.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{school.address}</td>
                                <td className="border border-gray-300 px-4 py-2">{school.city}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <img
                                        src={school.image}
                                        alt={school.name}
                                        className="h-16 w-16 object-cover rounded-md mx-auto"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        onClick={() => handleEdit(school.id)}
                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                    >
                                        <Edit className="w-5 h-5 inline" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(school?.slug)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Manage;

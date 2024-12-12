'use client'
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());


const SchoolDetails = () => {
    const {id} = useParams()

    const { data, error, isLoading } = useSWR(`/api/schools/index/${id}`, fetcher,{
        revalidateOnFocus: false,
        revalidateOnReconnect: false, 
    });
    const school = data?.schools || [];

    if (isLoading) {
        return <Loader />; 
    }

    if (!school) {
        return <p className="text-center text-red-500">School details not found!</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 border shadow-lg rounded-lg bg-white my-5">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                School Details
            </h1>
            <div className="space-y-6">
                <div className="text-center">
                    <Image
                        src={school.image}
                        alt={school.name}
                        width={100}
                        height={100}
                        className="w-32 h-32 mx-auto rounded-lg shadow-md object-cover"
                    />
                </div>
                <div>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold text-gray-800">Name:</span>{" "}
                        {school.name}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold text-gray-800">Address:</span>{" "}
                        {school.address}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold text-gray-800">City:</span>{" "}
                        {school.city}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold text-gray-800">State:</span>{" "}
                        {school.state || "NA"}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold text-gray-800">Contact:</span>{" "}
                        {school.contact || "NA"}
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold text-gray-800">Email:</span>{" "}
                        {school.email_id || "NA"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SchoolDetails;

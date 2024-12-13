'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Home, MapPin, Map } from 'lucide-react'; // Importing Lucide icons
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import Loader from '@/components/Loader';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ShowSchools() {
    const [searchTerm, setSearchTerm] = useState('');
    const defaultImage = `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png`

    const { data, error, isLoading } = useSWR('/api/schools/index', fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    const schools = data?.schools || [];


    const filteredSchools = schools?.filter(school =>
        school?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        school?.city?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        school?.address?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (isLoading) {
        return (
            <Loader />
        )
    }

    if (error) {
        console.error('Error fetching schools:', error);
        return <div>Error loading schools.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-5">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">Schools</h1>
                <Link href="/addSchool" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add School
                </Link>
            </div>

            {filteredSchools?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {
                        filteredSchools?.map((school) => (
                            <div
                                key={school?.id}
                                className="border p-4 rounded-md shadow-md flex flex-col justify-between h-full"
                            >
                                <div className="mb-4 rounded-md  relative overflow-hidden hover:rounded-md" onContextMenu={(e) => e.preventDefault()}>
                                    <Image
                                        src={school?.image || defaultImage}
                                        alt={school?.name}
                                        width={500}
                                        height={200}
                                        className="w-full h-32 object-cover rounded-md  transition-transform duration-500 ease-in-out transform hover:scale-125"
                                        draggable="false"
                                    />
                                </div>
                                
                                <div className="flex-grow">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Home className="h-5 w-5" />
                                        <h3 className="text-md font-semibold">{school?.name}</h3>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <MapPin className="h-5 w-5" />
                                        <p>{school.address}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Map className="h-5 w-5" />
                                        <p>{school.city}</p>
                                    </div>
                                </div>

                                <Link
                                    href={`/apply/${school?.slug}`}
                                    className="mt-4 w-full text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Apply Now
                                </Link>
                            </div>

                        ))}
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <p className="text-red-500 font-bold text-center">
                        Oops! Schools not found or not available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
}

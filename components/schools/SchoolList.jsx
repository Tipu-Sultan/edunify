'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, MapPin, BookOpen, Star } from 'lucide-react';

export default function SchoolList({schools}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.location.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-0 gradient-text">
          Discover Schools
        </h1>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-80"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.map((school) => (
          <Link href={`/schools/${school.id}`} key={school.id}>
            <Card className="card-hover h-full">
              <CardHeader className="p-0">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <img
                    src={school.images[0]}
                    alt={school.name}
                    className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white text-xl font-semibold">{school.name}</h3>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span>{school.location.city}, {school.location.state}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    <span>{school.board}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{school.reviews[0]?.rating || "N/A"} / 5</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {school.extracurriculars.slice(0, 3).map((activity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                    {school.extracurriculars.length > 3 && (
                      <span className="text-sm text-muted-foreground">+{school.extracurriculars.length - 3} more</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Search, MapPin, BookOpen, Star, Filter } from 'lucide-react';

export default function SchoolList({ schools }) {
  const [searchTerm, setSearchTerm] = useState(''); // General search (name, city)
  const [boardFilter, setBoardFilter] = useState('all'); // Filter by board, default to 'all'
  const [levelFilter, setLevelFilter] = useState('all'); // Filter by education level, default to 'all'
  const [activityFilter, setActivityFilter] = useState('all'); // Filter by extracurricular, default to 'all'
  const [showFilters, setShowFilters] = useState(false); // Toggle filter visibility

  // Extract unique values for filter options
  const uniqueBoards = [...new Set(schools.map(school => school.board))];
  const uniqueLevels = [...new Set(schools.flatMap(school => school.educationLevel))];
  const uniqueActivities = [...new Set(schools.flatMap(school => school.extracurriculars))];

  // Filter schools based on all criteria
  const filteredSchools = schools.filter(school => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBoard = boardFilter === 'all' ? true : school.board === boardFilter;
    const matchesLevel = levelFilter === 'all' ? true : school.educationLevel.includes(levelFilter);
    const matchesActivity = activityFilter === 'all' ? true : school.extracurriculars.includes(activityFilter);

    return matchesSearch && matchesBoard && matchesLevel && matchesActivity;
  });

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
              placeholder="Search by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full md:w-80"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-5 w-5" />
            Filters
          </Button>
        </div>
      </div>

      {/* Filter Options (Collapsible) */}
      {showFilters && (
        <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Board</label>
            <Select onValueChange={setBoardFilter} value={boardFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select a board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Boards</SelectItem>
                {uniqueBoards.map(board => (
                  <SelectItem key={board} value={board}>{board}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Education Level</label>
            <Select onValueChange={setLevelFilter} value={levelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {uniqueLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Extracurricular Activity</label>
            <Select onValueChange={setActivityFilter} value={activityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select an activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                {uniqueActivities.map(activity => (
                  <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* School List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => (
            <Link href={`/schools/${school.slug}`} key={school.id}>
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
                        <span className="text-sm text-muted-foreground">
                          +{school.extracurriculars.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-muted-foreground">No schools match your filters.</p>
        )}
      </div>
    </div>
  );
}
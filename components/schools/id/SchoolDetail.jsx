'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MapPin, BookOpen, Users, Award} from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn from ShadCN utils
import { useRouter } from 'next/navigation';
import ImageSlider from './ImageSlider';

export default function SchoolDetail({ school }) {
  const router = useRouter(); // Assuming you're using Next.js router

  const handleApply = (schoolId) => {
    router.push(`/schools/${schoolId}/apply`); // Redirect to the application page
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{school.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>
                {school.location.city}, {school.location.state}
              </span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>{school.board}</span>
            </div>
          </div>

          {/* Custom Image Slider with ShadCN Styling */}
          <div className={cn('relative mb-8')}>
            <ImageSlider school={school}/>
          </div>

          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>School Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Education Levels</h3>
                      <div className="flex gap-2">
                        {school.educationLevel.map((level, index) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Extracurricular Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {school.extracurriculars.map((activity, index) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {school.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faculty">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {school.teachers.map((teacher) => (
                  <Card key={teacher.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{teacher.subject}</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          <span>{teacher.qualification}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Experience: {teacher.experience}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                {school.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-2 font-semibold">{review.rating}/5</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                      <p className="text-sm mt-2">- {review.user}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Admission Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Annual Fee</h3>
                  <p className="text-lg">{school.fee}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Medium of Instruction</h3>
                  <p>{school.medium}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleApply(school.id)}
                >
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { School, Search, Users, Star, ArrowRight, GraduationCap, BookOpen } from 'lucide-react';
import { useTheme } from 'next-themes'; // For theme detection

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="py-24 sm:py-32 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 dark:from-blue-800 dark:via-purple-900 dark:to-pink-800 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md">
              Discover the Perfect School for Your Child’s Bright Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 dark:text-gray-200">
              Explore top schools in India with detailed insights on facilities, faculty, and reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schools">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-purple-300 dark:hover:bg-gray-700"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Explore Schools
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            Why Choose Edunify?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <School className="h-12 w-12 mx-auto text-blue-500 dark:text-blue-400" />
                <h3 className="mt-4 text-xl font-semibold">Top Schools</h3>
                <p className="mt-2 text-muted-foreground">
                  A curated list of India’s finest schools with world-class facilities.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto text-purple-500 dark:text-purple-400" />
                <h3 className="mt-4 text-xl font-semibold">Expert Faculty</h3>
                <p className="mt-2 text-muted-foreground">
                  Learn about qualified educators shaping your child’s future.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 mx-auto text-yellow-500 dark:text-yellow-400" />
                <h3 className="mt-4 text-xl font-semibold">Parent Reviews</h3>
                <p className="mt-2 text-muted-foreground">
                  Authentic feedback from parents to guide your decision.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:to-teal-400">
            Edunify by the Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-green-600 dark:text-green-400">500+</p>
              <p className="mt-2 text-muted-foreground">Schools Listed</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-teal-600 dark:text-teal-400">10,000+</p>
              <p className="mt-2 text-muted-foreground">Happy Parents</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400">50+</p>
              <p className="mt-2 text-muted-foreground">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
            What Parents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
                <p className="text-muted-foreground">
                  "Edunify made finding a school so easy! The detailed reviews and faculty info helped us choose the perfect fit."
                </p>
                <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  - Priya Sharma, Parent
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <Star className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-muted-foreground">
                  "The platform is user-friendly and visually appealing. We found a great school in just a few clicks!"
                </p>
                <p className="mt-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  - Anil Kumar, Parent
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-700 dark:to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shape Your Child’s Future?
          </h2>
          <p className="text-xl mb-8 text-gray-100 dark:text-gray-200">
            Join thousands of parents who trust Edunify to find the best schools.
          </p>
          <Link href="/schools">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
            >
              Start Exploring Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
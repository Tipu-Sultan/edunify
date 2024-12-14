'use client'
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              Edunify
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link href="/addSchool" className="hover:text-blue-200">
              Add School
            </Link>
            <Link href="/manage" className="hover:text-blue-200">
              Manage School
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" /> 
              ) : (
                <Menu className="h-6 w-6" /> 
              )}
            </button>
          </div>
        </div>

        <div className="md:hidden">
          {isMenuOpen && (
            <div className="block py-2 px-4 text-sm">
              <Link
                href="/"
                className="block py-2 px-4 text-sm hover:bg-blue-500 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/addSchool"
                className="block py-2 px-4 text-sm hover:bg-blue-500 hover:text-white"
              >
                Add School
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

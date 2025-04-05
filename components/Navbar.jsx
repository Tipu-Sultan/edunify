'use client';

import { useState } from 'react';
import Link from 'next/link';
import { School, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <School className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold text-primary">Edunify</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/schools">
              <Button variant="ghost">Schools</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <ThemeSwitcher />
            {isLoggedIn ? (
              <Link href="/admin">
                <Button>
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { School, Home, BookOpen, Info, Menu, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ThemeSwitcher from './ThemeSwitcher';

export default function MobileNav() {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(status === 'authenticated');
  }, [status]);

  return (
    <>
      {/* Top Bar (Branding, Theme, Avatar) */}
      <div className="lg:hidden flex justify-between items-center bg-background border-b px-4 py-2 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <School className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold text-primary">Edunify</span>
        </Link>
        <div className="flex items-center space-x-2">
          <ThemeSwitcher />
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {session?.user?.name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/signout" className="w-full text-red-500">
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Bottom Fixed Navbar with Icons */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around items-center z-50 shadow-sm">
        <Link href="/">
          <Button variant="ghost" size="icon" className="flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Button>
        </Link>
        <Link href="/schools">
          <Button variant="ghost" size="icon" className="flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <BookOpen className="h-6 w-6" />
            <span className="text-xs mt-1">Schools</span>
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="ghost" size="icon" className="flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <Info className="h-6 w-6" />
            <span className="text-xs mt-1">About</span>
          </Button>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="flex flex-col items-center hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu className="h-6 w-6" />
              <span className="text-xs mt-1">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 w-64 bg-background">
            <div className="flex flex-col space-y-4">
              <Link href="/schools">
                <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                  Schools
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                  About
                </Button>
              </Link>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                      Profile
                    </Button>
                  </Link>
                  {session?.user?.userType === 'SUPERADMIN' && (
                    <Link href="/admin">
                      <Button variant="outline" className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/api/auth/signout">
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:bg-red-50 dark:hover:bg-red-900">
                      Sign Out
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/login">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}
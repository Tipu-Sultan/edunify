"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { School, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeSwitcher from "./ThemeSwitcher";

export default function DesktopNav() {
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(status === "authenticated");
  }, [status]);

  return (
    <nav className="hidden lg:flex bg-background border-b fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          {/* Branding */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <School className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold text-primary">
              Edunify
            </span>
          </Link>

          {/* Navigation Links & Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/schools">
              <Button
                variant="ghost"
                className="text-base hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Schools
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                className="text-base hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                About
              </Button>
            </Link>
            <ThemeSwitcher />
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {session?.user?.userType === "SCHOOLADMIN" && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={session?.user?.image || ""}
                          alt={session?.user?.name || "User"}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-64">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {session?.user?.email}
                      </p>
                    </div>

                    <hr className="border-t my-1" />

                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="w-full cursor-pointer">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="w-full cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/api/auth/signout"
                        className="w-full text-destructive cursor-pointer"
                      >
                        Sign Out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button>
                  <User className="mr-2 h-4 w-4" />
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

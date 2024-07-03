'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const router = useRouter();

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    router.push("/login"); // Example logout redirection
  };

  const ProfileDropdown = () => (
    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <div className="py-1" role="none">
        <Link href="/profile" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
          Profile
        </Link>
        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Logout</button>
        <Link href="/settings" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
          Settings
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <header>
        <nav
          className={`relative flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 py-2 text-white shadow-lg hover:text-neutral-100 focus:text-neutral-100 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start ${isNavOpen ? "lg:h-auto" : ""
            }`}
          data-te-navbar-ref
        >
          <div className="flex items-center justify-between w-full px-3">
            <div className="flex items-center">
              <Link href="/" passHref className="text-white text-lg font-semibold">
                Company Name
              </Link>
            </div>

            <button
              className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-white focus:text-white dark:hover:text-white dark:focus:text-white lg:hidden"
              type="button"
              onClick={toggleNav}
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>

            <div className={`${isNavOpen ? "block" : "hidden"} lg:flex lg:visible flex-grow items-center`} id="navbarSupportedContentX" data-te-collapse-item>
              <ul className="mr-auto flex flex-col lg:flex-row" data-te-navbar-nav-ref>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <Link href="/" passHref>
                    <span className={`block transition duration-300 ease-in-out hover:text-white focus:text-white disabled:text-gray-300 dark:hover:text-white dark:focus:text-white lg:p-2 ${router.pathname === "/" ? "text-white" : ""}`}>
                      Home
                    </span>
                  </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <Link href="/addschools" passHref>
                    <span className={`block transition duration-300 ease-in-out hover:text-white focus:text-white disabled:text-gray-300 dark:hover:text-white dark:focus:text-white lg:p-2 ${router.pathname === "/addschools" ? "text-white" : ""}`}>
                      Add Schools
                    </span>
                  </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <Link href="/showschools" passHref>
                    <span className={`block transition duration-300 ease-in-out hover:text-white focus:text-white disabled:text-gray-300 dark:hover:text-white dark:focus:text-white lg:p-2 ${router.pathname === "/showschools" ? "text-white" : ""}`}>
                      Show Schools
                    </span>
                  </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <Link href="/myschools" passHref>
                    <span className={`block transition duration-300 ease-in-out hover:text-white focus:text-white disabled:text-gray-300 dark:hover:text-white dark:focus:text-white lg:p-2 ${router.pathname === "/myschools" ? "text-white" : ""}`}>
                      Posted Schools
                    </span>
                  </Link>
                </li>
              </ul>

              <div className="flex items-center ml-auto space-x-4">
                <Link href={'/login'}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                  Login
                </button>
                </Link>
                <Link href={'/register'}>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                  Signup
                </button>
                </Link>

                <div className="relative">
                  <button className="text-white focus:outline-none" onClick={toggleNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isNavOpen && <ProfileDropdown />}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;

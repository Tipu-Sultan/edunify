'use client'
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <div>
      <header>
        <nav
          className={`relative flex w-full items-center justify-between bg-gradient-to-r from-blue-500 to-purple-500 py-2 text-white shadow-lg hover:text-neutral-100 focus:text-neutral-100 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start ${
            isNavOpen ? "lg:h-auto" : ""
          }`}
          data-te-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="flex items-center">
              <button
                className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-white focus:text-white dark:hover:text-white dark:focus:text-white lg:hidden"
                type="button"
                onClick={toggleNav}
                aria-label="Toggle navigation"
              >
                <span className="[&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div
              className={`${
                isNavOpen ? "block" : "hidden"
              } lg:flex lg:visible flex-grow items-center`}
              id="navbarSupportedContentX"
              data-te-collapse-item
            >
              <ul className="mr-auto flex flex-col lg:flex-row" data-te-navbar-nav-ref>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <Link
                    href="/"
                    className={`block transition duration-300 ease-in-out hover:text-white focus:text-white disabled:text-gray-300 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-white`}
                    data-te-nav-link-ref
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <Link
                    href="/addschools"
                    className={`block transition duration-300 ease-in-out hover:text-white focus:text-white disabled:text-gray-300 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-white`}
                    data-te-nav-link-ref
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Add Schools
                  </Link>
                </li>
                <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <Link
                    href="/showschools"
                    className={`block transition duration-300 ease-in-out hover:text-white focus:text-white disabled:text-gray-300 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-white`}
                    data-te-nav-link-ref
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Show Schools
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;


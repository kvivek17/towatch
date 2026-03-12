"use client";
import React, { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Navabar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TOWATCH</span>
        </Link>

        {/* Toggle button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Responsive menu */}
        <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-gray-700 dark:text-white">
            <li><Link href="/" className="block py-2 px-3">Home</Link></li>
            <li><Link href="/allrooms" className="block py-2 px-3">Rooms</Link></li>
            <li><Link href="/dashboard" className="block py-2 px-3">Join</Link></li>
            <li><Link href="/pricing" className="block py-2 px-3">About</Link></li>
            <li><Link href="/contact" className="block py-2 px-3">Contact</Link></li>
            <li><UserButton /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navabar;

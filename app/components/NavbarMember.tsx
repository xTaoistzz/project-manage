"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('username');
    router.push('/');
  };

  return (
    <nav className="bg-blue-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <div className="text-white font-semibold text-lg">Home</div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/project">
            <div className="text-white font-semibold hover:underline mr-4">Projects</div>
          </Link>
          <span className="text-white">|</span>
          <button onClick={handleLogout} className="text-white font-semibold hover:underline ml-4">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = !!Cookies.get('username');
      setLoggedIn(isLoggedIn);
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    Cookies.remove('username');
    setLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="bg-blue-950 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <Link href="/">
          <div className="text-white font-semibold text-lg">Home</div>
        </Link>
        {loggedIn && (
          <>
            <Link href="/project">
              <div className="text-white font-semibold text-lg ml-4">Projects</div>
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center">
        {loggedIn ? (
          <>
            <button onClick={handleLogout} className="text-white font-semibold hover:underline mr-4">Logout</button>
          </>
        ) : (
          <div className="flex">
            <Link href="/auth/login">
              <div className="text-white font-semibold hover:underline mr-4">Login</div>
            </Link>
            <span className="text-white">|</span>
            <Link href="/auth/register">
              <div className="text-white font-semibold hover:underline ml-4">Register</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
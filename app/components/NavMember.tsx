"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import jwt from "jsonwebtoken";

const handleLogout = async () => {
    try {
        const res = await axios.post(`http://localhost:5000/logout`);
        console.log(res)
    } catch (error) {
        console.error(error)
    }

};

const NavMember: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            AnTCV
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link
              href="/auth/register"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Project
            </Link>
            <Link
                // onClick={handleLogout}
              href="/auth/login"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavMember;

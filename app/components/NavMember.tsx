"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

const NavMember: React.FC = () => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/returnUsername`, { withCredentials: true });
      setName(res.data.username);
      console.log(res.data.username);
    } catch (error) {
      console.error("Error fetching the username:", error);
    }
  };
  useEffect(() => {
    getName();
  }, []);

  const handleLogout = async() => { 
    try {
      const res = await axios.get(`${process.env.BACK_URL}/logout`, {withCredentials:true})
      console.log(res.data)
    } catch (error) {
      console.log('ERROR',error)
    }
  }

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
            <div id="name-c" className="text-xl text-white">
              {name}
            </div>
            <Link
              href="/project"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              Project
            </Link>
            <Link
              onClick={handleLogout}
              href="/"
              className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
            >
              Logout
              {
                
              }
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavMember;